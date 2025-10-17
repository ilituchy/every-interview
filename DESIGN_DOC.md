# Design Documentation

## Component Architecture

I broke this app into four components to keep things clean and maintainable:

**ChallengeComponent** - The parent container that owns all state and business logic. Everything flows through here.

**SwimLane** - Represents a single column. Gets a filtered list of todos for its status and renders them. Pretty straightforward container component.

**TodoItem** - The individual todo card with arrow buttons. Handles its own UI but calls back up to the parent for state changes.

**TodoInputForm** - The form at the bottom for adding new todos. Keeps its own input state so the parent doesn't have to worry about it.

The main idea was to keep state management centralized while making the UI components reusable and easy to test.

## Callback Propagation

Since state lives in ChallengeComponent but the buttons are in TodoItem, I needed a way to bubble events up. Standard React pattern - pass callbacks down as props:

ChallengeComponent defines moveLeft and moveRight functions, passes them to SwimLane, which passes them to TodoItem. When you click an arrow button, it calls the callback with the todo ID, and the state update happens at the top level.

This keeps data flow unidirectional and predictable - state flows down, events flow up.

## Scalability: Index-Based Column Logic

Originally I was checking specific status values to determine when buttons should be disabled. Something like checking if status equals "todo" for the left button. That works but doesn't scale.

If I wanted to add a fourth column or reorder them, I'd have to update all those hardcoded checks. Not great.

Instead, I refactored to use column indices. Each SwimLane knows its position (0, 1, 2, etc.) and the total number of columns. TodoItem uses that to determine button states:
- Disable left if columnIndex is 0 (first column)
- Disable right if columnIndex equals totalColumns - 1 (last column)

Same logic in the move functions - find the current column index in the COLUMNS array, then move to index +1 or -1.

Now if I want to add more columns, I just update the COLUMNS array and everything adapts automatically. Way more flexible.

## UX Enhancements

**Text Truncation** - Todo items truncate text to 3 lines max with an ellipsis. Prevents users from adding extremely long text that breaks the layout. Used Tailwind's line-clamp-3 utility to handle this cleanly. Hovering over truncated text shows the full content via the native browser tooltip.

**Auto-Scroll on Changes** - Each SwimLane automatically scrolls to the bottom when todos are added or moved. This keeps the most recent item visible without requiring manual scrolling. Implemented with useRef to track the scroll container and useEffect to trigger the scroll when the todos array changes.
