import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { TodoItem } from "./TodoItem";

describe("TodoItem", () => {
  const mockCallbacks = {
    onMoveLeft: vi.fn(),
    onMoveRight: vi.fn(),
    onDelete: vi.fn(),
    onEdit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Button disabled states based on column position", () => {
    it("should disable left arrow when in first column (columnIndex = 0)", () => {
      render(
        <TodoItem
          id={1}
          text="Test todo"
          status="todo"
          columnIndex={0}
          totalColumns={3}
          {...mockCallbacks}
        />
      );

      const leftArrow = screen.getByText("←");
      const rightArrow = screen.getByText("→");

      expect(leftArrow).toBeDisabled();
      expect(rightArrow).not.toBeDisabled();
    });

    it("should enable both arrows when in middle column (columnIndex = 1)", () => {
      render(
        <TodoItem
          id={1}
          text="Test todo"
          status="inProgress"
          columnIndex={1}
          totalColumns={3}
          {...mockCallbacks}
        />
      );

      const leftArrow = screen.getByText("←");
      const rightArrow = screen.getByText("→");

      expect(leftArrow).not.toBeDisabled();
      expect(rightArrow).not.toBeDisabled();
    });

    it("should disable right arrow when in last column (columnIndex = totalColumns - 1)", () => {
      render(
        <TodoItem
          id={1}
          text="Test todo"
          status="done"
          columnIndex={2}
          totalColumns={3}
          {...mockCallbacks}
        />
      );

      const leftArrow = screen.getByText("←");
      const rightArrow = screen.getByText("→");

      expect(leftArrow).not.toBeDisabled();
      expect(rightArrow).toBeDisabled();
    });

    it("should work correctly with different total column counts", () => {
      render(
        <TodoItem
          id={1}
          text="Test todo"
          status="done"
          columnIndex={4}
          totalColumns={5}
          {...mockCallbacks}
        />
      );

      const leftArrow = screen.getByText("←");
      const rightArrow = screen.getByText("→");

      expect(leftArrow).not.toBeDisabled();
      expect(rightArrow).toBeDisabled();
    });
  });

  describe("Button interactions", () => {
    it("should call onMoveLeft when left arrow is clicked", async () => {
      const user = userEvent.setup();
      render(
        <TodoItem
          id={123}
          text="Test todo"
          status="inProgress"
          columnIndex={1}
          totalColumns={3}
          {...mockCallbacks}
        />
      );

      const leftArrow = screen.getByText("←");
      await user.click(leftArrow);

      expect(mockCallbacks.onMoveLeft).toHaveBeenCalledWith(123);
      expect(mockCallbacks.onMoveLeft).toHaveBeenCalledTimes(1);
    });

    it("should call onMoveRight when right arrow is clicked", async () => {
      const user = userEvent.setup();
      render(
        <TodoItem
          id={456}
          text="Test todo"
          status="todo"
          columnIndex={0}
          totalColumns={3}
          {...mockCallbacks}
        />
      );

      const rightArrow = screen.getByText("→");
      await user.click(rightArrow);

      expect(mockCallbacks.onMoveRight).toHaveBeenCalledWith(456);
      expect(mockCallbacks.onMoveRight).toHaveBeenCalledTimes(1);
    });

    it("should call onDelete when delete button is clicked", async () => {
      const user = userEvent.setup();
      render(
        <TodoItem
          id={789}
          text="Test todo"
          status="todo"
          columnIndex={0}
          totalColumns={3}
          {...mockCallbacks}
        />
      );

      const deleteButton = screen.getByText("🗑️");
      await user.click(deleteButton);

      expect(mockCallbacks.onDelete).toHaveBeenCalledWith(789);
      expect(mockCallbacks.onDelete).toHaveBeenCalledTimes(1);
    });

    it("should open edit modal when edit button is clicked", async () => {
      const user = userEvent.setup();
      render(
        <TodoItem
          id={1}
          text="Test todo"
          status="todo"
          columnIndex={0}
          totalColumns={3}
          {...mockCallbacks}
        />
      );

      const editButton = screen.getByText("✏️");
      await user.click(editButton);

      // Modal should be visible
      expect(screen.getByText("Edit Todo")).toBeInTheDocument();
      expect(screen.getByRole("textbox")).toHaveValue("Test todo");
    });

    it("should call onEdit when saving changes in modal", async () => {
      const user = userEvent.setup();
      render(
        <TodoItem
          id={1}
          text="Original text"
          status="todo"
          columnIndex={0}
          totalColumns={3}
          {...mockCallbacks}
        />
      );

      // Open modal
      const editButton = screen.getByText("✏️");
      await user.click(editButton);

      // Edit text
      const textarea = screen.getByRole("textbox");
      await user.clear(textarea);
      await user.type(textarea, "Updated text");

      // Save
      const saveButton = screen.getByRole("button", { name: /save/i });
      await user.click(saveButton);

      expect(mockCallbacks.onEdit).toHaveBeenCalledWith(1, "Updated text");
      expect(mockCallbacks.onEdit).toHaveBeenCalledTimes(1);
    });
  });

  describe("Text display", () => {
    it("should display todo text", () => {
      render(
        <TodoItem
          id={1}
          text="My important task"
          status="todo"
          columnIndex={0}
          totalColumns={3}
          {...mockCallbacks}
        />
      );

      expect(screen.getByText("My important task")).toBeInTheDocument();
    });

    it("should truncate long text visually", () => {
      const longText = "a".repeat(500);
      render(
        <TodoItem
          id={1}
          text={longText}
          status="todo"
          columnIndex={0}
          totalColumns={3}
          {...mockCallbacks}
        />
      );

      const textElement = screen.getByText(longText);
      expect(textElement).toHaveClass("line-clamp-3");
    });

    it("should show full text in title attribute for tooltip", () => {
      const longText = "This is a very long todo item that will be truncated";
      render(
        <TodoItem
          id={1}
          text={longText}
          status="todo"
          columnIndex={0}
          totalColumns={3}
          {...mockCallbacks}
        />
      );

      const textElement = screen.getByText(longText);
      expect(textElement).toHaveAttribute("title", longText);
    });
  });
});
