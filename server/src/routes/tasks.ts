import express from "express";
import supabase from "../supabaseClient.js";

const router = express.Router();

// Get all tasks
router.get("/tasks", async (_, res) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select()
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(200).json({
        success: true,
        tasks: data,
      });
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while fetching tasks",
    });
  }
});

// Create new task
router.post("/task", async (req, res) => {
  try {
    const newTask = req.body;

    // Basic validation
    if (!newTask.name || !newTask.stage) {
      // typescript does not allow returnign this
      // instead im using if statements to control the final
      // result of res
      res.status(400).json({
        success: false,
        error: "Task name and stage are required",
      });
    } else {
      const { data, error } = await supabase
        .from("tasks")
        .insert({
          ...newTask,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select();

      if (error) {
        console.error("Database error:", error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
      } else {
        console.log("Successfully created task:", data);
        res.status(201).json({
          success: true,
          task: data[0],
        });
      }
    }
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while creating task",
    });
  }
});

// Update task
router.put("/task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { stage, desc, name } = req.body;

    // Basic validation
    if (!taskId) {
      res.status(400).json({
        success: false,
        error: "Task ID is required",
      });
    } else {
      const updateData = {
        updated_at: new Date().toISOString(),
        stage: stage ?? undefined,
        desc: desc ?? undefined,
        name: name ?? undefined,
      };

      // Only update fields that are provided
      if (stage !== undefined) updateData.stage = stage;
      if (desc !== undefined) updateData.desc = desc;
      if (name !== undefined) updateData.name = name;

      const { data, error } = await supabase
        .from("tasks")
        .update(updateData)
        .eq("id", taskId)
        .select();

      if (error) {
        console.error("Database error:", error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
      } else if (!data || data.length === 0) {
        res.status(404).json({
          success: false,
          error: "Task not found",
        });
      } else {
        res.status(200).json({
          success: true,
          task: data[0],
        });
      }
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while updating task",
    });
  }
});

// Delete task
router.delete("/task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!taskId) {
      res.status(400).json({
        success: false,
        error: "Task ID is required",
      });
    } else {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", taskId)
        .select();

      if (error) {
        console.error("Database error:", error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
      } else if (!data || data.length === 0) {
        res.status(404).json({
          success: false,
          error: "Task not found or already deleted",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Task deleted successfully",
          task: data[0],
        });
      }
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while deleting task",
    });
  }
});

export default router;
