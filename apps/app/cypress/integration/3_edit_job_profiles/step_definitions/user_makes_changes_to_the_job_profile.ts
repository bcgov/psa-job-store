import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is logged in', () => {
  cy.login(); // You'll define a custom command in Cypress for login
});

When('user is editing a job profile', () => {
  cy.visit('/my-positions/1');
});

When('the user selects "Band 1" from the classification dropdown', () => {
  cy.visit('/wizard');
});

When('the user changes the job title to "Project Manager"', () => {
  cy.get('[data-testid="job-title-input"]').clear().type('Project Manager');
});

When('the user changes program overview to "Program overview updated"', () => {
  cy.get('[data-testid="program-overview-input"]').clear().type('Program overview updated');
});

When('the user changes job overview to "Overview updated"', () => {
  cy.get('[data-testid="job-overview-input"]').clear().type('Overview updated');
});

// ACCOUNTABILITIES

Then('the first accountability should not be editable', () => {
  // Check if the read-only text for the first accountability is present
  cy.get('[data-testid="readonly-accountability-0"]').should('exist');

  // Check if the delete button for the first accountability is present and disabled
  // This assumes you're using `remove-accountability-${index}` for the delete button regardless of state; adjust if necessary
  cy.get('[data-testid="remove-accountability-0"]').should('be.disabled');
});

When('the user removes last two default accountabilities', () => {
  cy.get('[data-testid="remove-accountability-6"]').click(); // Adjust index as needed
  cy.get('[data-testid="remove-accountability-7"]').click(); // Adjust index as needed
});

// Undos removal of last accountability
When('the user undos removal of last accountability', () => {
  cy.get('[data-testid="undo-remove-accountability-7"]').click();
});

// Adds a new required accountability "Lead successful deployments"
When('the user adds a new required accountability "Lead successful deployments"', () => {
  cy.get('[data-testid="add-accountability-button"]').click();
  cy.get('[data-testid="accountability-input-8"]').type('Lead successful deployments');
});

// Deletes the newly added accountability "Lead successful deployments"
When('the user deletes the newly added accountability "Lead successful deployments"', () => {
  cy.get('[data-testid="remove-accountability-8"]').click(); // Adjust identifier as needed
  // Now, click the OK button in the confirmation dialog
  cy.contains('button', 'OK').click();
  cy.wait(200);
});

// Adds a new required accountability "Manage project budget"
When('the user adds a new required accountability "Manage project budget"', () => {
  cy.get('[data-testid="add-accountability-button"]').click();
  cy.get('[data-testid="accountability-input-8"]').click();
  cy.get('[data-testid="accountability-input-8"]').type('Manage project budget');
});

// OPTIONAL ACCOUNTABILITIES
When('the user removes the last optional accountability', () => {
  // Assuming each accountability has a remove button with a specific data-testid pattern
  cy.get('[data-testid^="optional-accountability-checkbox-"]').last().click();
});

When('the user adds a new optional accountability {string}', (accountability: string) => {
  // Click the add button, enter the text for the new accountability
  cy.get('[data-testid="add-optional-accountability-button"]').click();
  cy.get('[data-testid="optional-accountability-input-3"]').type(accountability);
});

When('the user deletes the newly added optional accountability {string}', (_accountability: string) => {
  cy.get('[data-testid="remove-optional-accountability-3"]').click(); // Adjust identifier as needed
  // Now, click the OK button in the confirmation dialog
  cy.contains('button', 'OK').click();
  cy.wait(200);
});

// EDUCATION

// Check if the first job education is not editable
Then('the first job education should not be editable', () => {
  // Check if the read-only text for the first job education is present
  cy.get('[data-testid="readonly-education-0"]').should('exist');

  // Check if the delete button for the first job education is present and disabled
  cy.get('[data-testid="remove-education-0"]').should('be.disabled');
});

// Removes the last two default job educations
When('the user removes the last two default job educations', () => {
  cy.get('[data-testid="remove-education-7"]').click(); // Adjust index as needed
  cy.get('[data-testid="remove-education-8"]').click(); // Adjust index as needed
});

// Undoes removal of the last job education
When('the user undoes the removal of the last job education', () => {
  cy.get('[data-testid="undo-remove-education-8"]').click();
});

// Adds a new required job education "Ensure compliance with financial regulations"
When('the user adds a new required job education "Ensure compliance with financial regulations"', () => {
  cy.get('[data-testid="add-education-button"]').click();
  cy.get('[data-testid="education-input-9"]').type('Ensure compliance with financial regulations');
});

// Deletes the newly added job education "Ensure compliance with financial regulations"
When('the user deletes the newly added job education "Ensure compliance with financial regulations"', () => {
  cy.get('[data-testid="remove-education-9"]').click(); // Adjust identifier as needed
  // Now, click the OK button in the confirmation dialog
  cy.contains('button', 'OK').click();
  cy.wait(200);
});

// Adds a new required job education "Oversee financial auditing processes"
When('the user adds a new required job education "Oversee financial auditing processes"', () => {
  cy.get('[data-testid="add-education-button"]').click();
  cy.get('[data-testid="education-input-9"]').click(); // Assuming this click is to focus before typing
  cy.get('[data-testid="education-input-9"]').type('Oversee financial auditing processes');
});

// RELATED EXPERIENCE

// Check if the first related experience is not editable
Then('the first related experience should not be editable', () => {
  cy.get('[data-testid="readonly-job-experience-0"]').should('exist');
  cy.get('[data-testid="remove-job-experience-0"]').should('be.disabled');
});

// Removes the last two default related experiences
When('the user removes the last two default related experiences', () => {
  cy.get('[data-testid="remove-job-experience-1"]').click(); // Adjust index as needed
  cy.get('[data-testid="remove-job-experience-2"]').click(); // Adjust index as needed
});

// Undoes removal of the last related experience
When('the user undoes the removal of the last related experience', () => {
  cy.get('[data-testid="undo-remove-job-experience-2"]').click();
});

// Adds a new required related experience "Coordinate cross-departmental projects"
When('the user adds a new required related experience "Coordinate cross-departmental projects"', () => {
  cy.get('[data-testid="add-job-experience-button"]').click();
  cy.get('[data-testid="job-experience-input-3"]').type('Coordinate cross-departmental projects');
});

// Deletes the newly added related experience "Coordinate cross-departmental projects"
When('the user deletes the newly added related experience "Coordinate cross-departmental projects"', () => {
  cy.get('[data-testid="remove-job-experience-3"]').click(); // Adjust identifier as needed
  cy.contains('button', 'OK').click();
  cy.wait(200);
});

// Adds a new required related experience "Implement strategic planning processes"
When('the user adds a new required related experience "Implement strategic planning processes"', () => {
  cy.get('[data-testid="add-job-experience-button"]').click();
  cy.get('[data-testid="job-experience-input-3"]').click(); // Assuming this click is to focus before typing
  cy.get('[data-testid="job-experience-input-3"]').type('Implement strategic planning processes');
});

// PROFESSIONAL REGISTRATION REQUIREMENTS

// Removes the last two default professional registration requirements
When('the user removes the last two default professional registration requirements', () => {
  cy.get('[data-testid="remove-professional-registration-0"]').click(); // Adjust index as needed
  cy.get('[data-testid="remove-professional-registration-1"]').click(); // Adjust index as needed
});

// Undoes removal of the last professional registration requirement
When('the user undoes the removal of the last professional registration requirement', () => {
  cy.get('[data-testid="undo-remove-professional-registration-1"]').click();
});

// Adds a new required professional registration requirement "Maintain annual membership with the national engineering association"
When(
  'the user adds a new required professional registration requirement "Maintain annual membership with the national engineering association"',
  () => {
    cy.get('[data-testid="add-professional-registration-button"]').click();
    cy.get('[data-testid="professional-registration-input-2"]').type(
      'Maintain annual membership with the national engineering association',
    );
  },
);

// Deletes the newly added professional registration requirement "Maintain annual membership with the national engineering association"
When(
  'the user deletes the newly added professional registration requirement "Maintain annual membership with the national engineering association"',
  () => {
    cy.get('[data-testid="remove-professional-registration-2"]').click(); // Adjust identifier as needed
    cy.contains('button', 'OK').click();
    cy.wait(200);
  },
);

// Adds a new required professional registration requirement "Achieve certification in project management within two years"
When(
  'the user adds a new required professional registration requirement "Achieve certification in project management within two years"',
  () => {
    cy.get('[data-testid="add-professional-registration-button"]').click();
    cy.get('[data-testid="professional-registration-input-2"]').click(); // Assuming this click is to focus before typing
    cy.get('[data-testid="professional-registration-input-2"]').type(
      'Achieve certification in project management within two years',
    );
  },
);

// PREFERENCES

// Removes the last two default preferences
When('the user removes the last two default preferences', () => {
  cy.get('[data-testid="remove-preference-0"]').click(); // Adjust index as needed
  cy.get('[data-testid="remove-preference-1"]').click(); // Adjust index as needed
});

// Undoes removal of the last preference
When('the user undoes the removal of the last preference', () => {
  cy.get('[data-testid="undo-remove-preference-1"]').click();
});

// Adds a new required preference "Remote work flexibility"
When('the user adds a new required preference "Remote work flexibility"', () => {
  cy.get('[data-testid="add-preference-button"]').click();
  cy.get('[data-testid="preference-input-2"]').type('Remote work flexibility');
});

// Deletes the newly added preference "Remote work flexibility"
When('the user deletes the newly added preference "Remote work flexibility"', () => {
  cy.get('[data-testid="remove-preference-2"]').click(); // Adjust identifier as needed
  cy.contains('button', 'OK').click();
  cy.wait(200);
});

// Adds a new required preference "Access to continuous learning resources"
When('the user adds a new required preference "Access to continuous learning resources"', () => {
  cy.get('[data-testid="add-preference-button"]').click();
  cy.get('[data-testid="preference-input-2"]').click(); // Assuming this click is to focus before typing
  cy.get('[data-testid="preference-input-2"]').type('Access to continuous learning resources');
});

// KNOWLEDGE, SKILLS AND ABILITIES

// Removes the last two default knowledge, skills, or abilities
When('the user removes the last two default knowledge, skills, or abilities', () => {
  cy.get('[data-testid="remove-knowledge-skills-ability-0"]').click(); // Adjust index as needed
  cy.get('[data-testid="remove-knowledge-skills-ability-1"]').click(); // Adjust index as needed
});

// Undoes removal of the last knowledge, skill, or ability
When('the user undoes the removal of the last knowledge, skill, or ability', () => {
  cy.get('[data-testid="undo-remove-knowledge-skills-ability-1"]').click();
});

// Adds a new required knowledge, skill, or ability "Advanced data analysis proficiency"
When('the user adds a new required knowledge, skill, or ability "Advanced data analysis proficiency"', () => {
  cy.get('[data-testid="add-knowledge-skills-ability-button"]').click();
  cy.get('[data-testid="knowledge-skills-ability-input-2"]').type('Advanced data analysis proficiency');
});

// Deletes the newly added knowledge, skill, or ability "Advanced data analysis proficiency"
When('the user deletes the newly added knowledge, skill, or ability "Advanced data analysis proficiency"', () => {
  cy.get('[data-testid="remove-knowledge-skills-ability-2"]').click(); // Adjust identifier as needed
  cy.contains('button', 'OK').click();
  cy.wait(200);
});

// Adds a new required knowledge, skill, or ability "Expertise in cloud computing technologies"
When('the user adds a new required knowledge, skill, or ability "Expertise in cloud computing technologies"', () => {
  cy.get('[data-testid="add-knowledge-skills-ability-button"]').click();
  cy.get('[data-testid="knowledge-skills-ability-input-2"]').click(); // Assuming this click is to focus before typing
  cy.get('[data-testid="knowledge-skills-ability-input-2"]').type('Expertise in cloud computing technologies');
});

// PROVISOS

// Removes the last two default willingness statements or provisos
When('the user removes the last two default willingness statements or provisos', () => {
  cy.get('[data-testid="remove-proviso-0"]').click(); // Adjust index as needed
  cy.get('[data-testid="remove-proviso-1"]').click(); // Adjust index as needed
});

// Undoes removal of the last willingness statement or proviso
When('the user undoes the removal of the last willingness statement or proviso', () => {
  cy.get('[data-testid="undo-remove-proviso-1"]').click();
});

// Adds a new required willingness statement or proviso "Willing to relocate to different offices as needed"
When(
  'the user adds a new required willingness statement or proviso "Willing to relocate to different offices as needed"',
  () => {
    cy.get('[data-testid="add-proviso-button"]').click();
    cy.get('[data-testid="proviso-input-2"]').type('Willing to relocate to different offices as needed');
  },
);

// Deletes the newly added willingness statement or proviso "Willing to relocate to different offices as needed"
When(
  'the user deletes the newly added willingness statement or proviso "Willing to relocate to different offices as needed"',
  () => {
    cy.get('[data-testid="remove-proviso-2"]').click(); // Adjust identifier as needed
    cy.contains('button', 'OK').click();
    cy.wait(200);
  },
);

// Adds a new required willingness statement or proviso "Available for on-call duties during weekends"
When(
  'the user adds a new required willingness statement or proviso "Available for on-call duties during weekends"',
  () => {
    cy.get('[data-testid="add-proviso-button"]').click();
    cy.get('[data-testid="proviso-input-2"]').click(); // Assuming this click is to focus before typing
    cy.get('[data-testid="proviso-input-2"]').type('Available for on-call duties during weekends');
  },
);

// SECURITY SCREENINGS

// Check if the first security screening is not editable
Then('the first security screening should not be editable', () => {
  cy.get('[data-testid="readonly-security-screening-0"]').should('exist');
  cy.get('[data-testid="remove-security-screening-0"]').should('be.disabled');
});

// Removes the last two default security screenings
When('the user removes the last two default security screenings', () => {
  cy.get('[data-testid="remove-security-screening-1"]').click(); // Adjust index as needed
  cy.get('[data-testid="remove-security-screening-2"]').click(); // Adjust index as needed
});

// Undoes removal of the last security screening
When('the user undoes the removal of the last security screening', () => {
  cy.get('[data-testid="undo-remove-security-screening-2"]').click();
});

// Adds a new required security screening "Must pass a comprehensive background check"
When('the user adds a new required security screening "Must pass a comprehensive background check"', () => {
  cy.get('[data-testid="add-security-screening-button"]').click();
  cy.get('[data-testid="security-screening-input-3"]').type('Must pass a comprehensive background check');
});

// Deletes the newly added security screening "Must pass a comprehensive background check"
When('the user deletes the newly added security screening "Must pass a comprehensive background check"', () => {
  cy.get('[data-testid="remove-security-screening-3"]').click(); // Adjust identifier as needed
  cy.contains('button', 'OK').click();
  cy.wait(200);
});

// Adds a new required security screening "Requires clearance at the top-secret level"
When('the user adds a new required security screening "Requires clearance at the top-secret level"', () => {
  cy.get('[data-testid="add-security-screening-button"]').click();
  cy.get('[data-testid="security-screening-input-3"]').click(); // Assuming this click is to focus before typing
  cy.get('[data-testid="security-screening-input-3"]').type('Requires clearance at the top-secret level');
});

// OPTIONAL REQUIREMENTS

// Removes the last two default optional requirements
When('the user removes the last two default optional requirements', () => {
  cy.get('[data-testid="remove-optional-requirement-0"]').click(); // Adjust index as needed
  cy.get('[data-testid="remove-optional-requirement-1"]').click(); // Adjust index as needed
});

// Undoes removal of the last optional requirement
When('the user undoes the removal of the last optional requirement', () => {
  cy.get('[data-testid="undo-remove-optional-requirement-1"]').click();
});

// Adds a new required optional requirement "Familiarity with agile methodologies"
When('the user adds a new required optional requirement "Familiarity with agile methodologies"', () => {
  cy.get('[data-testid="add-optional-requirement-button"]').click();
  cy.get('[data-testid="optional-requirement-input-2"]').type('Familiarity with agile methodologies');
});

// Deletes the newly added optional requirement "Familiarity with agile methodologies"
When('the user deletes the newly added optional requirement "Familiarity with agile methodologies"', () => {
  cy.get('[data-testid="remove-optional-requirement-2"]').click(); // Adjust identifier as needed
  cy.contains('button', 'OK').click();
  cy.wait(200);
});

// Adds a new required optional requirement "Proficiency in multiple programming languages"
When('the user adds a new required optional requirement "Proficiency in multiple programming languages"', () => {
  cy.get('[data-testid="add-optional-requirement-button"]').click();
  cy.get('[data-testid="optional-requirement-input-2"]').click(); // Assuming this click is to focus before typing
  cy.get('[data-testid="optional-requirement-input-2"]').type('Proficiency in multiple programming languages');
});

// BEHAVIOURAL COMPETENCIES

When('the user removes the last behavioral competency', () => {
  cy.get('[data-testid^="remove-behavioral-competency-"]').last().click();
});

Then('the user adds a new behavioral competency "Conceptual thinking"', () => {
  cy.get('[data-testid="behavioral-competencies-selector"]').click();
  cy.contains('.ant-select-tree-title', 'Conceptual thinking').click();
});

Then('the user types "analytical" and selects the first item under "Achieving Business Results"', () => {
  // Click the Tree Selector to ensure it's focused and ready for input
  cy.get('[data-testid="behavioral-competencies-selector"]').click();

  // Type "analytical" into the search field
  cy.get('[data-testid="behavioral-competencies-selector"] .ant-select-selection-search-input')
    .first() // In case there are multiple, ensure we're targeting the correct one
    .type('analytical', { force: true });

  // Wait for the dropdown options to filter based on the search input
  cy.wait(500); // Adjust based on actual behavior, or use .should() to wait for a specific condition

  // Since items are not nested under categories in the provided HTML structure, target the item directly
  cy.contains('.ant-select-tree-node-content-wrapper-normal', 'Analytical thinking').click({ force: true }); // Using force: true to deal with any potential visibility issues
});

// FINISHED EDIT FORM - GO TO REVIEW
When('the user clicks the "Next" button', () => {
  cy.get('[data-testid="next-button"]').click();
});

Then('they proceed to the review changes step', () => {
  // Check for a unique element on the review changes page
  // Replace 'unique-element-selector' with an actual selector for an element unique to this page
  cy.get('[data-testid="review-changes-page"]').should('be.visible');
});

Then('the diff view is turned off', () => {
  cy.get('[data-testid="toggleDiffSwitch"]').click();
});

Then('the review page should display the updated job title "Project Manager"', () => {
  cy.get('[data-testid="job-title"]').should('contain', 'Project Manager');
});

Then('the review page should display the updated program overview "Program overview updated"', () => {
  cy.get('[data-testid="program-overview"]').should('contain', 'Program overview updated');
});

Then('the review page should display the updated job overview "Overview updated"', () => {
  cy.get('[data-testid="job-overview"]').should('contain', 'Overview updated');
});

// Accountibilities checking
Then('the last accountability should be "Manage project budget"', () => {
  cy.get('[data-testid="significant-accountabilities"] > li').last().should('have.text', 'Manage project budget');
});

// And the second last accountability should start with "Market research, data mining"
Then('the second last accountability should start with "Market research, data mining"', () => {
  cy.get('[data-testid="significant-accountabilities"] > li')
    .eq(-2)
    .should('contain.text', 'Market research, data mining');
});

// Optional Accountibilities checking
Then('the last optional accountability should be "Effective communication"', () => {
  cy.get('[data-testid="optional-accountabilities"] > li').last().should('have.text', 'Effective communication');
});

Then('the second last optional accountability should start with "Analyze past results"', () => {
  cy.get('[data-testid="optional-accountabilities"] > li').eq(-2).should('contain.text', 'Analyze past results');
});

// Education and work experience checking

Then('the last job education should be "Oversee financial auditing processes"', () => {
  cy.get('[data-testid="education"] > li').last().should('have.text', 'Oversee financial auditing processes');
});

Then('the second last job education should start with "Advanced knowledge of Excel"', () => {
  cy.get('[data-testid="education"] > li').eq(-2).should('contain.text', 'Advanced knowledge of Excel');
});

// Related experience checking
Then('the last related experience should be "Implement strategic planning processes"', () => {
  cy.get('[data-testid="job-experience"] > li').last().should('have.text', 'Implement strategic planning processes');
});

Then('the second last related experience should start with "Related experience 3"', () => {
  cy.get('[data-testid="job-experience"] > li').eq(-2).should('contain.text', 'Related experience 3');
});

// Professional registration requirements
Then(
  'the last professional registration requirement should be "Achieve certification in project management within two years"',
  () => {
    cy.get('[data-testid="professional-registration"] > li')
      .last()
      .should('have.text', 'Achieve certification in project management within two years');
  },
);

Then(
  'the second last professional registration requirement should start with "Professional registration requirement 2"',
  () => {
    cy.get('[data-testid="professional-registration"] > li')
      .eq(-2)
      .should('contain.text', 'Professional registration requirement 2');
  },
);

// Preferences

Then('the last preference should be "Access to continuous learning resources"', () => {
  cy.get('[data-testid="preferences"] > li').last().should('have.text', 'Access to continuous learning resources');
});

Then('the second last preference should start with "Preference 2"', () => {
  cy.get('[data-testid="preferences"] > li').eq(-2).should('contain.text', 'Preference 2');
});

// Knowledge, skill and abilities
Then('the last knowledge, skill or ability should be "Expertise in cloud computing technologies"', () => {
  cy.get('[data-testid="knowledge-skills-abilities"] > li')
    .last()
    .should('have.text', 'Expertise in cloud computing technologies');
});

Then('the second last  knowledge, skill or ability should start with "Knowledge, Skills, and Abilities 2"', () => {
  cy.get('[data-testid="knowledge-skills-abilities"] > li')
    .eq(-2)
    .should('contain.text', 'Knowledge, Skills, and Abilities 2');
});

// Provisos
Then('the last proviso should be "Available for on-call duties during weekends"', () => {
  cy.get('[data-testid="provisos"] > li').last().should('have.text', 'Available for on-call duties during weekends');
});

Then('the second last proviso should start with "Proviso 2"', () => {
  cy.get('[data-testid="provisos"] > li').eq(-2).should('contain.text', 'Proviso 2');
});

// Security screenings
Then('the last security screening should be "Requires clearance at the top-secret level"', () => {
  cy.get('[data-testid="security-screenings"] > li')
    .last()
    .should('have.text', 'Requires clearance at the top-secret level');
});

Then('the second last security screening should start with "Security Screening 3"', () => {
  cy.get('[data-testid="security-screenings"] > li').eq(-2).should('contain.text', 'Security Screening 3');
});

// Optional requirement
Then('the last optional requirement should be "Proficiency in multiple programming languages"', () => {
  cy.get('[data-testid="optional-requirements"] > li')
    .last()
    .should('have.text', 'Proficiency in multiple programming languages');
});

Then('the second last optional requirement should start with "Optional requirement 2"', () => {
  cy.get('[data-testid="optional-requirements"] > li').eq(-2).should('contain.text', 'Optional requirement 2');
});

// Behavioural competencies

Then('the third last behavioural competency should start with "Planning, organizing and coordinating"', () => {
  cy.get('[data-testid="behavioural-competencies"] > li')
    .eq(-3)
    .should('contain.text', 'Planning, organizing and coordinating');
});

Then('the second last behavioural competency should start with "Conceptual thinking"', () => {
  cy.get('[data-testid="behavioural-competencies"] > li').eq(-2).should('contain.text', 'Conceptual thinking');
});

Then('the last behavioural competency should start with "Analytical thinking"', () => {
  cy.get('[data-testid="behavioural-competencies"] > li').eq(-1).should('contain.text', 'Analytical thinking');
});

// after(() => {
//   // Check if the "Back" button exists before attempting to click
//   cy.get('body').then(($body) => {
//     if ($body.find('[data-testid="back-button"]').length > 0) {
//       // If the "Back" button exists, click it
//       cy.wait(1000);
//       cy.get('[data-testid="back-button"]').click();
//       cy.wait(1000);
//     } else {
//       // If the "Back" button does not exist, you can log a message or perform alternative actions
//       cy.log('Back button does not exist, skipping click action.');
//     }
//   });

//   cy.get('[data-testid="undo-remove-accountability-7"]').click();
//   cy.get('[data-testid="remove-accountability-9"]').click();
//   cy.contains('button', 'OK').click();

//   cy.get('[data-testid="undo-remove-education-7"]').click();
//   cy.get('[data-testid="remove-education-9"]').click();
//   cy.contains('button', 'OK').click();

//   cy.get('[data-testid="undo-remove-job-experience-1"]').click();
//   cy.get('[data-testid="remove-job-experience-3"]').click();
//   cy.contains('button', 'OK').click();

//   cy.get('[data-testid="undo-remove-professional-registration-0"]').click();
//   cy.get('[data-testid="remove-professional-registration-2"]').click();
//   cy.contains('button', 'OK').click();

//   cy.get('[data-testid="undo-remove-preference-0"]').click();
//   cy.get('[data-testid="remove-preference-2"]').click();
//   cy.contains('button', 'OK').click();

//   cy.get('[data-testid="undo-remove-knowledge-skills-ability-0"]').click();
//   cy.get('[data-testid="remove-knowledge-skills-ability-2"]').click();
//   cy.contains('button', 'OK').click();

//   cy.get('[data-testid="undo-remove-proviso-0"]').click();
//   cy.get('[data-testid="remove-proviso-2"]').click();
//   cy.contains('button', 'OK').click();

//   cy.get('[data-testid="undo-remove-security-screening-1"]').click();
//   cy.get('[data-testid="remove-security-screening-3"]').click();
//   cy.contains('button', 'OK').click();

//   cy.get('[data-testid="undo-remove-optional-requirement-0"]').click();
//   cy.get('[data-testid="remove-optional-requirement-2"]').click();
//   cy.contains('button', 'OK').click();

//   cy.get('[data-testid="next-button"]').click();
//   cy.wait(1000);
//   cy.get('[data-testid="back-button"]').click();
//   cy.wait(1000);
// });
