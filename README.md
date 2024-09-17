# Candidate Assessment Platform

This platform is built using the following tools:
- Vite js
- React js
- Tailwind CSS
- Hosted Supabase Server (PostgreSQL)

## Getting Started

To demo this project:

1. Clone this repo:
    ```bash
    git clone <repository-url>
    ```

2. Change directory into the project folder:
    ```bash
    cd <project-directory>
    ```

3. Install the necessary dependencies:
    ```bash
    npm install
    ```

4. Create a `.env.local` file in the root directory and populate it with your environment variables. Contact [batjin@umich.edu](mailto:batjin@umich.edu) for the contents of this file.

5. Start the development server:
    ```bash
    npm run dev
    ```

6. Open your browser and navigate to `http://localhost:5173` to view the application.

## Available Routes
- / home
- /admin/sign-in
- /admin/sign-up
- /admin/dashboard
- /candidate/sign-in
- /candidate/sign-up
- /candidate/assignments

## Supabase for DB
I used Supabase and its sdk for authentication and hosted PostgreSQL database. More info about the table schemas, row-level-security and authentication can be provided on request. 

## Table Schema

  - **`users`**: Manage both admins and candidates.
      - Columns: `id`, `email`, `role (admin/candidate)`, `created_at`, `metadata`
  - **`questions`**: Store questions and their difficulty levels.
      - Columns: `id`, `question_text`, `difficulty_level (1-20)`, `correct_answer (boolean)`
  - **`question_sets`**: Store question sets created by admins.
      - Columns: `id`, `admin_id`, `questions (array of question ids)`, `created_at`
  - **`assignments`**: Track which candidate gets assigned which question set.
      - Columns: `id`, `candidate_id`, `question_set_id`, `created_at`
  - **`responses`**: Store candidate responses and their progression.
      - Columns: `id`, `candidate_id`, `question_id`, `response (true/false)`, `answered_at`

## User Roles

### Admin

- **Sign-in URL**: `/admin/sign-in`
- **Capabilities**:
  - Manage question sets
  - Assign question sets to candidates
  - View candidate responses and performance on the dashboard

**Note:** For simplicity, any user can sign up to become an admin via the URL. There is no email confirmation due to Supabase's email rate limits. For production, it's recommended to manually create the admin user in the database and expose only the sign-in URL to restrict access to the dashboard.

### Candidate

- **Sign-in URL**: `/candidate/sign-in`
- **Capabilities**:
  - Access assigned question sets
  - Answer questions based on difficulty

**Note:** Candidates cannot access the admin dashboard to ensure proper access control.

## Detours - skipped features for simplicity

- **Admin User Creation**: In a production environment, manually creating admin users and limiting sign-in URLs is advisable. This ensures that only authorized personnel can access the admin functionalities.
- **Email Confirmation**: To avoid rate limits with Supabase, email confirmation is not implemented. For a more secure setup, consider integrating a proper email service for confirmation and user management.
- Deleting and updating questions on the admin dashboard
- Performance dashboard for candidates
- more ...


## Contact

For any questions or issues, please contact [batjin@umich.edu](mailto:batjin@umich.edu).
