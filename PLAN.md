# Todo Board Implementation Plan

## Overview
Building a todo board with three columns: Todo, In Progress, and Done.

## Core Requirements
- 3 columns for different states
- Add new todos via form input
- Move items left/right between columns
- Disable boundary buttons (left on first column, right on last column)

### Columns
- Each column filters todos by status
- Columns: "Todo", "In Progress", "Done"

## Component Structure

### Main Component: ChallengeComponent
- Manages all state (todos array)
- Contains form for adding new todos
- Renders 3 columns (variable)

### Sub-components
- **TodoColumn**: Renders a single column with filtered todos
- **TodoItem**: Individual todo card with left/right arrow buttons
- **AddTodoForm**: Form input for creating new todos

Alternative: Keep it simple with everything in one component initially

## State Management
- Single `todos` state array
- Each todo has id, text, and status
- Form input has its own controlled state

## Implementation Phases
1. Set up data structure and state
2. Render basic column layout
3. Add todo creation form
4. Implement movement logic
5. Style with Tailwind CSS
