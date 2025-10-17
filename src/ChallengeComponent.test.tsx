import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ChallengeComponent } from "./ChallengeComponent";

describe("ChallengeComponent", () => {
  describe("Adding todos", () => {
    it("should add a new todo to the Todo column", async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent />);

      const input = screen.getByPlaceholderText("Add a new todo...");
      const addButton = screen.getByRole("button", { name: /add/i });

      await user.type(input, "Buy groceries");
      await user.click(addButton);

      expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    });

    it("should clear input after adding todo", async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent />);

      const input = screen.getByPlaceholderText("Add a new todo...");
      const addButton = screen.getByRole("button", { name: /add/i });

      await user.type(input, "New task");
      await user.click(addButton);

      expect(input).toHaveValue("");
    });

    it("should not add empty todos", async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent />);

      const addButton = screen.getByRole("button", { name: /add/i });
      await user.click(addButton);

      const todoColumn = screen.getByText("Todo").closest("div");
      expect(within(todoColumn!).getByText("No items")).toBeInTheDocument();
    });
  });

  describe("Moving todos between columns", () => {
    it("should move todo from Todo to In Progress", async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent />);

      // Add a todo
      const input = screen.getByPlaceholderText("Add a new todo...");
      await user.type(input, "Test task");
      await user.click(screen.getByRole("button", { name: /add/i }));

      // Find and click the right arrow button
      const todoItem = screen.getByText("Test task").closest("div");
      const rightArrow = within(todoItem!).getByText("→");
      await user.click(rightArrow);

      // Check it's in In Progress column
      const inProgressColumn = screen.getByText("In Progress").closest("div");
      expect(within(inProgressColumn!).getByText("Test task")).toBeInTheDocument();
    });

    it("should move todo from In Progress to Done", async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent />);

      // Add and move to In Progress
      const input = screen.getByPlaceholderText("Add a new todo...");
      await user.type(input, "Test task");
      await user.click(screen.getByRole("button", { name: /add/i }));

      const arrows = screen.getAllByText("→");
      await user.click(arrows[0]);

      // Move to Done
      const arrows2 = screen.getAllByText("→");
      await user.click(arrows2[0]);

      // Check it's in Done column
      const doneColumn = screen.getByText("Done").closest("div");
      expect(within(doneColumn!).getByText("Test task")).toBeInTheDocument();
    });

    it("should move todo back from In Progress to Todo", async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent />);

      // Add and move to In Progress
      const input = screen.getByPlaceholderText("Add a new todo...");
      await user.type(input, "Test task");
      await user.click(screen.getByRole("button", { name: /add/i }));

      const rightArrows = screen.getAllByText("→");
      await user.click(rightArrows[0]);

      // Move back to Todo
      const leftArrows = screen.getAllByText("←");
      await user.click(leftArrows[0]);

      // Check it's back in Todo column
      const todoColumn = screen.getByText("Todo").closest("div");
      expect(within(todoColumn!).getByText("Test task")).toBeInTheDocument();
    });
  });

  describe("Deleting todos", () => {
    it("should delete a todo after confirmation", async () => {
      const user = userEvent.setup();
      const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

      render(<ChallengeComponent />);

      // Add a todo
      const input = screen.getByPlaceholderText("Add a new todo...");
      await user.type(input, "Delete me");
      await user.click(screen.getByRole("button", { name: /add/i }));

      // Delete it
      const todoItem = screen.getByText("Delete me").closest("div");
      const deleteButton = within(todoItem!).getByText("🗑️");
      await user.click(deleteButton);

      expect(confirmSpy).toHaveBeenCalled();
      expect(screen.queryByText("Delete me")).not.toBeInTheDocument();

      confirmSpy.mockRestore();
    });

    it("should not delete todo if user cancels", async () => {
      const user = userEvent.setup();
      const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);

      render(<ChallengeComponent />);

      // Add a todo
      const input = screen.getByPlaceholderText("Add a new todo...");
      await user.type(input, "Keep me");
      await user.click(screen.getByRole("button", { name: /add/i }));

      // Try to delete it
      const todoItem = screen.getByText("Keep me").closest("div");
      const deleteButton = within(todoItem!).getByText("🗑️");
      await user.click(deleteButton);

      expect(confirmSpy).toHaveBeenCalled();
      expect(screen.getByText("Keep me")).toBeInTheDocument();

      confirmSpy.mockRestore();
    });
  });

  describe("Editing todos", () => {
    it("should edit a todo's text", async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent />);

      // Add a todo
      const input = screen.getByPlaceholderText("Add a new todo...");
      await user.type(input, "Original text");
      await user.click(screen.getByRole("button", { name: /add/i }));

      // Open edit modal
      const todoItem = screen.getByText("Original text").closest("div");
      const editButton = within(todoItem!).getByText("✏️");
      await user.click(editButton);

      // Edit the text - use getAllByRole since there's also the input form
      const textboxes = screen.getAllByRole("textbox");
      const textarea = textboxes[0]; // Modal textarea is first
      await user.clear(textarea);
      await user.type(textarea, "Updated text");
      await user.click(screen.getByRole("button", { name: /save/i }));

      expect(screen.getByText("Updated text")).toBeInTheDocument();
      expect(screen.queryByText("Original text")).not.toBeInTheDocument();
    });

    it("should cancel editing without changing text", async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent />);

      // Add a todo
      const input = screen.getByPlaceholderText("Add a new todo...");
      await user.type(input, "Original text");
      await user.click(screen.getByRole("button", { name: /add/i }));

      // Open edit modal
      const todoItem = screen.getByText("Original text").closest("div");
      const editButton = within(todoItem!).getByText("✏️");
      await user.click(editButton);

      // Try to edit but cancel - use getAllByRole since there's also the input form
      const textboxes = screen.getAllByRole("textbox");
      const textarea = textboxes[0]; // Modal textarea is first
      await user.clear(textarea);
      await user.type(textarea, "Changed text");
      await user.click(screen.getByRole("button", { name: /cancel/i }));

      expect(screen.getByText("Original text")).toBeInTheDocument();
      expect(screen.queryByText("Changed text")).not.toBeInTheDocument();
    });
  });

  describe("Button disabled states", () => {
    it("should disable left arrow in Todo column", async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent />);

      // Add a todo
      const input = screen.getByPlaceholderText("Add a new todo...");
      await user.type(input, "Test task");
      await user.click(screen.getByRole("button", { name: /add/i }));

      const todoItem = screen.getByText("Test task").closest("div");
      const leftArrow = within(todoItem!).getByText("←");

      expect(leftArrow).toBeDisabled();
    });

    it("should enable both arrows in In Progress column", async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent />);

      // Add and move to In Progress
      const input = screen.getByPlaceholderText("Add a new todo...");
      await user.type(input, "Test task");
      await user.click(screen.getByRole("button", { name: /add/i }));

      const rightArrows = screen.getAllByText("→");
      await user.click(rightArrows[0]);

      const todoItem = screen.getByText("Test task").closest("div");
      const leftArrow = within(todoItem!).getByText("←");
      const rightArrow = within(todoItem!).getByText("→");

      expect(leftArrow).not.toBeDisabled();
      expect(rightArrow).not.toBeDisabled();
    });

    it("should disable right arrow in Done column", async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent />);

      // Add and move to Done
      const input = screen.getByPlaceholderText("Add a new todo...");
      await user.type(input, "Test task");
      await user.click(screen.getByRole("button", { name: /add/i }));

      const rightArrows = screen.getAllByText("→");
      await user.click(rightArrows[0]);

      const rightArrows2 = screen.getAllByText("→");
      await user.click(rightArrows2[0]);

      const todoItem = screen.getByText("Test task").closest("div");
      const rightArrow = within(todoItem!).getByText("→");

      expect(rightArrow).toBeDisabled();
    });
  });
});
