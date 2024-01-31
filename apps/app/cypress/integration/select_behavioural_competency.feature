Feature: Behavioural Competencies Selection

  Users should be able to select a competency category and a competency to see its full description.

  Scenario: Viewing competencies for a selected category
    Given I am on the behavioural competencies selection page
    When I select a category from the dropdown
    Then the competencies dropdown should show competencies related to the selected category
    And the competency description should be empty

  Scenario: Selecting a behavioural competency to view its description
    Given I have selected a category with available competencies
    When I select a competency from the dropdown
    Then the description for the selected competency should be displayed below
