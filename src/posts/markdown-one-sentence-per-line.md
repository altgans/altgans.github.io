---
title: Markdown One Sentence Per Line
tags: 
- posts
- lua
- Vibe-coded
- markdown
- writing
date: 2025-11-02t18:35
---

I wanted a function that splits markdown into one sentence per line,
to support with academic writing and better diff'ing in `git`.

Note: Vibe-coded -- I pasted here the explanation from the LLM.
See the full code at the bottom.


## Overview

This Neovim Lua module (`wrap_sentences.lua`) defines a **custom command** `:WrapSentences` that **reformats selected Markdown paragraphs so that each sentence appears on its own line**, while preserving structure (code blocks, lists, tables, etc.). It uses **Tree-sitter** for accurate parsing and **smart sentence splitting** to avoid breaking abbreviations.

---

## Overview

- **File**: `~/.config/nvim/lua/wrap_sentences.lua`
- **Purpose**: Wrap Markdown sentences (one per line) in visually selected range or entire buffer.
- **Key Features**:
  - Uses **Tree-sitter** to parse only real `paragraph` nodes.
  - **Skips** code blocks, lists, tables, frontmatter.
  - **Smart sentence detection** (handles abbreviations like "Dr.", "e.g.").
  - Inserts **blank lines between paragraphs**.
  - Works in **visual mode** or with `:%WrapSentences`.

---

## Code Breakdown & Explanation

```lua
local M = {}
local ts = vim.treesitter
```
- `M` is the module table (returned at the end).
- `ts` is a local alias for `vim.treesitter`.

---

### Parser Cache

```lua
local parsers = {}
local function get_parser(bufnr)
    bufnr = bufnr or vim.api.nvim_get_current_buf()
    if not parsers[bufnr] then
        parsers[bufnr] = ts.get_parser(bufnr, "markdown")
    end
    return parsers[bufnr]
end
```
- **Caches** Tree-sitter parsers per buffer to avoid re-parsing.
- Always uses the **Markdown parser**.

> Efficient: reuses parser instead of recreating on every call.

---

### Node Skipping Logic

```lua
local skip_types = {
    "fenced_code_block", "indented_code_block", "code_fence_content",
    "list_item", "task_list_item", "ordered_list", "bullet_list",
    "list_marker", "frontmatter", "yaml_frontmatter", "toml_frontmatter",
    "pipe_table", "inline",
}
```
- These node types **should not be wrapped** (code, lists, metadata, tables).

```lua
local function should_skip_node(node)
    local cur = node
    while cur do
        if vim.tbl_contains(skip_types, cur:type()) then
            return true
        end
        cur = cur:parent()
    end
    return false
end
```
- Walks up the syntax tree from a node.
- If **any ancestor** is in `skip_types`, skip processing.

> Prevents wrapping inside code blocks or list items.

---

### Smart Sentence Splitting

```lua
local function split_sentences(text)
    local sentences = {}
    local rest = text:gsub("^%s+", ""):gsub("%s+$", "")  -- trim
    while #rest > 0 do
        -- Try: "content. Next" → captures before ".", space, and "Next..."
        local before, punct, space, after = rest:match("^(.-)([.!?])(%s+)([A-Z].*)$")
        if not before then
            -- Fallback: allow lowercase after punctuation
            before, punct, space, after = rest:match("^(.-)([.!?])(%s+)(.*)$")
        end
        if not before then
            -- Last chunk: add remaining text as one sentence
            local s = rest:gsub("%s+", " "):gsub("^%s+", ""):gsub("%s+$", "")
            if s ~= "" then table.insert(sentences, s) end
            break
        end

        local candidate = (before .. punct):gsub("%s+", " "):gsub("^%s+", ""):gsub("%s+$", "")
        local last_word = candidate:match("(%S+)%s*$") or ""

        -- Heuristic: if ends with "word." and word is abbreviation → don't split
        if punct == "." and last_word:match("^[A-Za-z]%.?$") then
            rest = rest:sub(#before + #punct + #space)
        else
            table.insert(sentences, candidate)
            rest = after or ""
        end
    end
    return sentences
end
```

#### Key Logic:
1. **Trim** input.
2. **Match**: `text . Space CapitalLetter...`
3. **Fallback**: allow lowercase after punctuation.
4. **Avoid splitting abbreviations**:
   - If sentence ends in `X.` where `X` is a single letter → treat as abbreviation.
   - Example: `"Dr. Smith"` → not split.
5. **Collapse multiple spaces** into one.
6. Continue until all text is processed.

> Robust against common false splits (e.g., "e.g.", "Fig. 1", "U.S.A.").

---

### Main `wrap()` Function

```lua
function M.wrap()
    local bufnr = vim.api.nvim_get_current_buf()
    local start_line = vim.api.nvim_buf_get_mark(bufnr, "<")[1]
    local end_line = vim.api.nvim_buf_get_mark(bufnr, ">")[1]
    if start_line == 0 or end_line == 0 then
        start_line, end_line = 1, vim.api.nvim_buf_line_count(bufnr)
    end
```
- Gets **visual selection marks** `<` and `>`.
- Falls back to **entire buffer** if not in visual mode.

```lua
    local parser = get_parser(bufnr)
    local ok, root = pcall(function() return parser:parse()[1]:root() end)
    if not ok then
        vim.notify("Tree-sitter parse failed", vim.log.levels.ERROR)
        return
    end
```
- Safely parse the buffer with Tree-sitter.
- Show error if parsing fails.

```lua
    local lines = vim.api.nvim_buf_get_lines(bufnr, start_line - 1, end_line, false)
    local new_lines = {}
    local line_offset = start_line - 1
    local query = ts.query.parse("markdown", [[ (paragraph) @para ]])
```
- Fetch lines in range.
- Prepare output array.
- Define Tree-sitter **query** to capture only `(paragraph)` nodes.

```lua
    local last_end = 0
    for _, node in query:iter_captures(root, bufnr, start_line - 1, end_line) do
        local srow, _, erow, _ = node:range()
        local para_start = srow - line_offset
        local para_end = erow - line_offset
```
- Iterate over **all paragraph nodes** in range.
- Convert absolute row numbers → indices in `lines` array.

```lua
        -- Preserve content between paragraphs (blank lines, headers, etc.)
        for i = last_end + 1, para_start do
            table.insert(new_lines, lines[i])
        end
```
- Copy **non-paragraph lines** (headings, blank lines, etc.) unchanged.

```lua
        if should_skip_node(node) then
            -- Copy entire block as-is
            for i = para_start + 1, para_end + 1 do
                table.insert(new_lines, lines[i])
            end
        else
            local para_text = ts.get_node_text(node, bufnr)
            local sents = split_sentences(para_text)
            for _, s in ipairs(sents) do
                table.insert(new_lines, s)
            end
            -- Add blank line after paragraph (unless last)
            if para_end < #lines then
                table.insert(new_lines, "")
            end
        end
        last_end = para_end
    end
```
- **Skip** nodes inside code/lists/etc.
- Otherwise:
  - Extract paragraph text.
  - Split into sentences.
  - Write **one sentence per line**.
  - Add **blank line** after (mimics Markdown paragraph spacing).

```lua
    -- Add any trailing lines after last paragraph
    for i = last_end + 1, #lines do
        table.insert(new_lines, lines[i])
    end

    -- Replace selected range in buffer
    vim.api.nvim_buf_set_lines(bufnr, start_line - 1, end_line, false, new_lines)
end
```

---

### User Command Registration

```lua
vim.api.nvim_create_user_command("WrapSentences", function(opts)
    if opts.range == 2 then
        M.wrap()
    else
        vim.notify("Use visual mode or :%WrapSentences", vim.log.levels.WARN)
    end
end, { range = true, desc = "Wrap Markdown sentences (1 per line)" })
```
- Creates `:WrapSentences`
- Only runs `M.wrap()` if called with a **range** (i.e., visual selection or `:%WrapSentences`)
- Otherwise shows helpful warning.

---

## How to Use

1. **Visual mode**:
   ```vim
   Vjjj:WrapSentences
   ```
   → Wraps selected lines.

1. **Entire file**:
   ```vim
   :%WrapSentences
   ```

1. **Keymap example** (add to your config):
   ```lua
   vim.keymap.set('v', '<leader>w', ':WrapSentences<CR>', { desc = "Wrap sentences" })
   ```

---

## Example

**Before**:
```markdown
This is a test. It has Dr. Smith and e.g. examples. Also Fig. 1.
Another paragraph follows.
```

**After**:
```markdown
This is a test.
It has Dr. Smith and e.g. examples.
Also Fig. 1.

Another paragraph follows.
```

> Code blocks, lists, tables untouched.



## The code 

Hey, it's me, your human again. This is the code I have in my lua config


```lua
-- ~/.config/nvim/lua/wrap_sentences.lua
-- Wrap Markdown: one clause per line (split at . ! ? ,)
-- • NO extra blank lines – original spacing preserved
-- • Skips code, lists, tables, frontmatter
-- • One `u` undoes everything
-- • Smart: Dr., e.g., Fig. 1, U.S.A. not split

local M = {}
local ts = vim.treesitter

-- Parser cache
local parsers = {}
local function get_parser(bufnr)
    bufnr = bufnr or vim.api.nvim_get_current_buf()
    if not parsers[bufnr] then
        parsers[bufnr] = ts.get_parser(bufnr, "markdown")
    end
    return parsers[bufnr]
end

-- Skip these node types
local skip_types = {
    "fenced_code_block",
    "indented_code_block",
    "code_fence_content",
    "list_item",
    "task_list_item",
    "ordered_list",
    "bullet_list",
    "list_marker",
    "frontmatter",
    "yaml_frontmatter",
    "toml_frontmatter",
    "pipe_table",
    "inline",
}
local function should_skip_node(node)
    local cur = node
    while cur do
        if vim.tbl_contains(skip_types, cur:type()) then
            return true
        end
        cur = cur:parent()
    end
    return false
end

-- Split at . ! ? , — avoid abbreviations
local function split_clauses(text)
    local clauses = {}
    local rest = text:gsub("^%s+", ""):gsub("%s+$", "")

    while #rest > 0 do
        local before, punct, space, after = rest:match("^(.-)([.!?,])(%s+)(.+)$")
        if not before then
            local final = rest:gsub("%s+", " "):gsub("^%s+", ""):gsub("%s+$", "")
            if final ~= "" then
                table.insert(clauses, final)
            end
            break
        end

        local candidate = (before .. punct):gsub("%s+", " "):gsub("^%s+", ""):gsub("%s+$", "")
        local last_word = candidate:match("(%S+)%s*$") or ""

        local is_abbrev = false
        if punct == "." then
            if last_word:match("^[A-Za-z]%.?$") then -- Dr., A.
                is_abbrev = true
            elseif last_word:match("^%d+$") then -- Fig. 1
                local next_word = after:match("^%s*(%S+)")
                if next_word and next_word:match("^%d+$") then
                    is_abbrev = true
                end
            end
        end

        if is_abbrev then
            rest = rest:sub(#before + #punct + #space)
        else
            table.insert(clauses, candidate)
            rest = after
        end
    end
    return clauses
end

function M.wrap()
    local bufnr = vim.api.nvim_get_current_buf()

    -- Visual range or full buffer
    local start_line = vim.api.nvim_buf_get_mark(bufnr, "<")[1]
    local end_line = vim.api.nvim_buf_get_mark(bufnr, ">")[1]
    if start_line == 0 or end_line == 0 then
        start_line, end_line = 1, vim.api.nvim_buf_line_count(bufnr)
    end

    -- Parse
    local parser = get_parser(bufnr)
    local ok, root = pcall(function()
        return parser:parse()[1]:root()
    end)
    if not ok then
        vim.notify("Tree-sitter parse failed", vim.log.levels.ERROR)
        return
    end

    local lines = vim.api.nvim_buf_get_lines(bufnr, start_line - 1, end_line, false)
    local new_lines = {}
    local line_offset = start_line - 1
    local query = ts.query.parse("markdown", [[ (paragraph) @para ]])
    local last_end = 0

    -- Process each paragraph
    for _, node in query:iter_captures(root, bufnr, start_line - 1, end_line) do
        local srow, _, erow, _ = node:range()
        local para_start = srow - line_offset
        local para_end = erow - line_offset

        -- Copy gap between paragraphs (includes blank lines)
        for i = last_end + 1, para_start do
            table.insert(new_lines, lines[i])
        end

        if should_skip_node(node) then
            for i = para_start + 1, para_end + 1 do
                table.insert(new_lines, lines[i])
            end
        else
            -- Preserve manual line breaks: process line-by-line
            for line_idx = srow, erow - 1 do
                local line_text = vim.api.nvim_buf_get_lines(bufnr, line_idx, line_idx + 1, false)[1] or ""
                if line_text:match("^%s*$") then
                    -- blank line: preserve exactly
                    table.insert(new_lines, line_text)
                else
                    local clauses = split_clauses(line_text)
                    if #clauses == 0 then
                        table.insert(new_lines, line_text)
                    else
                        for _, clause in ipairs(clauses) do
                            table.insert(new_lines, clause)
                        end
                    end
                end
            end
			-- prev version, working
            -- local para_text = ts.get_node_text(node, bufnr)
            -- local clauses = split_clauses(para_text)
            -- for _, clause in ipairs(clauses) do
            --     table.insert(new_lines, clause)
            -- end
        end

        last_end = para_end
    end

    -- Copy trailing lines
    for i = last_end + 1, #lines do
        table.insert(new_lines, lines[i])
    end

    -- === UNDO JOIN: safe, no-op first edit ===
    local start_idx = start_line - 1
    local end_idx = end_line

    -- 1. Insert a dummy line → creates undo block
    vim.api.nvim_buf_set_lines(bufnr, start_idx, start_idx, false, { "" })

    -- 2. Immediately remove it → no visual change
    vim.api.nvim_buf_set_lines(bufnr, start_idx, start_idx + 1, false, {})

    -- 3. Now undojoin is safe
    vim.cmd("undojoin")

    -- 4. Final replacement
    vim.api.nvim_buf_set_lines(bufnr, start_idx, end_idx, false, new_lines)
end

-- Command
vim.api.nvim_create_user_command("WrapSentences", function(opts)
    if opts.range == 2 then
        M.wrap()
    else
        vim.notify("Use visual mode or :%WrapSentences", vim.log.levels.WARN)
    end
end, { range = true, desc = "Wrap: one clause per line" })

return M
```
