Feature: Edit Job Profiles

    As a user,
    I want to edit job profiles and review my changes,
    So that I can confirm all edits before saving my personalized job profile copy.

    Background:
        Given the user is logged in
        And user is editing a job profile

    Scenario: User makes changes to the job profile
        When the user changes the job title to "Project Manager"
        And the user changes program overview to "Program overview updated"
        And the user changes job overview to "Overview updated"

        # Accountabilities
        Then the first accountability should not be editable
        And the user removes last two default accountabilities
        And the user undos removal of last accountability
        And the user adds a new required accountability "Lead successful deployments"
        And the user deletes the newly added accountability "Lead successful deployments"
        And the user adds a new required accountability "Manage project budget"

        # Optional accountabilities
        #  todo - implement with overlay
        # Then all optional accountabilities should be unchecked initially
        # And the user checks all optional accountabilities
        # And the user removes the last optional accountability
        # And the user adds a new optional accountability "Conceptual thinking" for first time
        # And the user deletes the newly added optional accountability "Conceptual thinking"
        # And the user adds a new optional accountability "Effective communication"

        # Educaiton and work experience
        Then the first job education should not be editable
        And the user removes the last two default job educations
        And the user undoes the removal of the last job education
        And the user adds a new required job education "Ensure compliance with financial regulations"
        And the user deletes the newly added job education "Ensure compliance with financial regulations"
        And the user adds a new required job education "Oversee financial auditing processes"

        # Related experience
        Then the first related experience should not be editable
        And the user removes the last two default related experiences
        And the user undoes the removal of the last related experience
        And the user adds a new required related experience "Coordinate cross-departmental projects"
        And the user deletes the newly added related experience "Coordinate cross-departmental projects"
        And the user adds a new required related experience "Implement strategic planning processes"

        # Professional registration requirements
        Then the user removes the last two default professional registration requirements
        And the user undoes the removal of the last professional registration requirement
        And the user adds a new required professional registration requirement "Maintain annual membership with the national engineering association"
        And the user deletes the newly added professional registration requirement "Maintain annual membership with the national engineering association"
        And the user adds a new required professional registration requirement "Achieve certification in project management within two years"

        # Preferences
        And the user removes the last two default preferences
        And the user undoes the removal of the last preference
        And the user adds a new required preference "Remote work flexibility"
        And the user deletes the newly added preference "Remote work flexibility"
        And the user adds a new required preference "Access to continuous learning resources"

        # Knowledge, skills, and abilities
        And the user removes the last two default knowledge, skills, or abilities
        And the user undoes the removal of the last knowledge, skill, or ability
        And the user adds a new required knowledge, skill, or ability "Advanced data analysis proficiency"
        And the user deletes the newly added knowledge, skill, or ability "Advanced data analysis proficiency"
        And the user adds a new required knowledge, skill, or ability "Expertise in cloud computing technologies"

        # Provisos
        And the user removes the last two default willingness statements or provisos
        And the user undoes the removal of the last willingness statement or proviso
        And the user adds a new required willingness statement or proviso "Willing to relocate to different offices as needed"
        And the user deletes the newly added willingness statement or proviso "Willing to relocate to different offices as needed"
        And the user adds a new required willingness statement or proviso "Available for on-call duties during weekends"

        # Security screenings
        Then the first security screening should not be editable
        And the user removes the last two default security screenings
        And the user undoes the removal of the last security screening
        And the user adds a new required security screening "Must pass a comprehensive background check"
        And the user deletes the newly added security screening "Must pass a comprehensive background check"
        And the user adds a new required security screening "Requires clearance at the top-secret level"

        # Optional requirements
        And the user removes the last two default optional requirements
        And the user undoes the removal of the last optional requirement
        And the user adds a new required optional requirement "Familiarity with agile methodologies"
        And the user deletes the newly added optional requirement "Familiarity with agile methodologies"
        And the user adds a new required optional requirement "Proficiency in multiple programming languages"

        # Behavioural competencies
        # Todo: implement with new selector
        # And the user removes the last behavioral competency
        # And the user adds a new behavioral competency "Conceptual thinking"
        # And the user types "analytical" and selects the first item under "Achieving Business Results"

        And the user clicks the "Next" button
        Then they proceed to the review changes step
        And the diff view is turned off


        # CHECKING

        And the review page should display the updated job title "Project Manager"
        And the review page should display the updated program overview "Program overview updated"
        And the review page should display the updated job overview "Overview updated"

        # Accountabilities
        And the last accountability should be "Manage project budget"
        And the second last accountability should start with "Market research, data mining"

        # # Optional accountabilities
        # Todo: implement
        # And the last optional accountability should be "Effective communication"
        # And the second last optional accountability should start with "Analyze past results"

        # Educaiton and work experience
        And the last job education should be "Oversee financial auditing processes"
        And the second last job education should start with "Advanced knowledge of Excel"

        # Related experience
        And the last related experience should be "Implement strategic planning processes"
        And the second last related experience should start with "Related experience 3"

        # Professional registration requirements
        And the last professional registration requirement should be "Achieve certification in project management within two years"
        And the second last professional registration requirement should start with "Professional registration requirement 2"

        # Preferences
        And the last preference should be "Access to continuous learning resources"
        And the second last preference should start with "Preference 2"

        # Knowledge, skill and abilities
        And the last knowledge, skill or ability should be "Expertise in cloud computing technologies"
        And the second last  knowledge, skill or ability should start with "Knowledge, Skills, and Abilities 2"


        # Provisos
        And the last proviso should be "Available for on-call duties during weekends"
        And the second last proviso should start with "Proviso 2"

        # Security screenings
        And the last security screening should be "Requires clearance at the top-secret level"
        And the second last security screening should start with "Security Screening 3"

        # Optional requirements
        And the last optional requirement should be "Proficiency in multiple programming languages"
        And the second last optional requirement should start with "Optional requirement 2"

# Behavioural competencies
# Todo: implement
# And the last behavioural competency should start with "Analytical thinking"
# And the second last behavioural competency should start with "Conceptual thinking"
# And the third last behavioural competency should start with "Planning, organizing and coordinating"