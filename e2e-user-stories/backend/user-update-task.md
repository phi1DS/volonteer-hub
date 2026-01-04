# US: Update Task

## User Story

**As a** registered user  
**I want** to update an existing task  
**So that** I can correct or change task details after creating it

## Acceptance Criteria

### AC1: Successfully update task
- **Given** a task with title "Help with groceries" exists for the logged-in user  
- **When** the user edits the task and changes the title to "Help with fruits"  
- **Then** the task is updated, and a success toast message appears  
- **And** the task page shows the updated title "Help with fruits"

### AC2: Invalid input
- **Given** a task with title "Help with glue" exists for the logged-in user  
- **When** the user tries to update the task with an empty title  
- **Then** an error message appears preventing the update
