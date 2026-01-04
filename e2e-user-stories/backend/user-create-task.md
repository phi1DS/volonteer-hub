# US: Create Task

## User Story

**As a** registered user  
**I want** to create a task  
**So that** it appears on my homepage

## Acceptance Criteria

### AC1: Task Created Successfully
- **Given** the user inputs correct task data with title "Help with oranges"
- **When** the user submits the form  
- **Then** the task is created, the user is redirected to the task page, and a success toast message appears

### AC2: Invalid Date
- **Given** the user inputs a past date  
- **When** the user submits the form  
- **Then** an error message appears, preventing task creation
