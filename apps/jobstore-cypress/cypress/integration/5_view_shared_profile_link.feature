Feature: View Shared Profile Link
    As a user,
    I want to view a shared profile link,
    So that I can see the job details, organization chart, and job profile

    Background:
        Given the user is logged in

    Scenario: User views shared profile content
        When the user navigates to the shared profile link
        Then the user should see the tab bar
        And the user should see three tabs

        When the user clicks on "Job details" tab
        Then the job details component should be visible

        When the user clicks on "Organization Chart" tab
        Then the organization chart component should be visible

        When the user clicks on "Job Profile" tab
        Then the job profile component should be visible
