// Define possible values for the context
export type CRMCategory = 'New Position' | 'Classification';
export type CRMStatus = 'Unresolved' | 'Updated' | 'Waiting - Client' | 'Waiting - Internal' | 'Solved';
type PSStatus = 'Approved' | 'Proposed';

export interface Context {
  CRM_category: CRMCategory;
  CRM_status: CRMStatus;
  PS_status: PSStatus;
}

// Define a transition rule
export interface Transition {
  condition: (context: Context) => boolean;
  nextState: string;
}

// The following table defines the mappings from external states to internal states.
// If a mapping is not defined here, the function will return UNKNOWN, and the state will not transition.

//  AL Status 		CRM Status 						                      CRM Category 					          PeopleSoft Status
//  Draft			    -								                            -								                -
//  Verification	Unresolved / Updated / Waiting Internal	    New Position					          Proposed
//  Action Req. 	Waiting Client 					                    New Position /Classification	  Proposed
//  Review		 	  Unresolved / Updated	/ Waiting Internal		Classification					        Proposed
//  Completed		  Solved 							                        New Position /Classification	  Approved

// Likewise, we need to map the actual statuses defined in prisma to these statuses.
// TODO: Data migration to change these statuses so we don't have to translate them.

//  AL Status 	        Prisma Status
//  DRAFT			         DRAFT
//  VERIFICATION       IN_REVIEW
//  ACTION_REQUIRED    ACTION_REQUIRED
//  REVIEW		         ESCALATED
//  COMPLETED	         COMPLETED

// Transition rules array
const transitions: Transition[] = [
  {
    condition: (context) =>
      (context.CRM_status === 'Unresolved' ||
        context.CRM_status === 'Updated' ||
        context.CRM_status === 'Waiting - Internal') &&
      context.CRM_category === 'New Position' &&
      context.PS_status === 'Proposed',
    nextState: 'IN_REVIEW',
  },
  {
    condition: (context) =>
      context.CRM_status === 'Solved' &&
      (context.CRM_category === 'New Position' || context.CRM_category.includes('Classification')) &&
      context.PS_status === 'Approved',
    nextState: 'COMPLETED',
  },
  {
    condition: (context) =>
      context.CRM_status === 'Waiting - Client' &&
      (context.CRM_category === 'New Position' || context.CRM_category.includes('Classification')) &&
      context.PS_status === 'Proposed',
    nextState: 'ACTION_REQUIRED',
  },
  {
    condition: (context) =>
      (context.CRM_status === 'Unresolved' ||
        context.CRM_status === 'Updated' ||
        context.CRM_status === 'Waiting - Internal') &&
      context.CRM_category.includes('Classification') &&
      context.PS_status === 'Proposed',
    nextState: 'ESCALATED',
  },
  {
    condition: (context) => context.CRM_status === 'Waiting - Client' && context.PS_status === 'Proposed',
    nextState: 'ACTION_REQUIRED',
  },
  {
    condition: (context) =>
      (context.CRM_status === 'Unresolved' ||
        context.CRM_status === 'Updated' ||
        context.CRM_status === 'Waiting - Internal') &&
      context.CRM_category.includes('Classification') &&
      context.PS_status === 'Proposed',
    nextState: 'REVIEW',
  },
];

export const getALStatus = (context: { category: string; crm_status: string; ps_status: string }): string => {
  console.log('changing status', JSON.stringify(context));
  for (const transition of transitions) {
    if (
      transition.condition({
        CRM_category: context.category as CRMCategory,
        CRM_status: context.crm_status as CRMStatus,
        PS_status: context.ps_status as PSStatus,
      })
    ) {
      return transition.nextState;
    }
  }

  // Return a default state or maintain current state if no conditions are met
  return 'UNKNOWN';
};

//// If we want to do a FSM, It might look something like this...

//type ALStatus = 'DRAFT' | 'VERIFICATION' | 'ACTION_REQUIRED' | 'REVIEW' | 'COMPLETED' | 'UNKNOWN';

// Define the context interface
// export interface NextContext {
//   CRM_category: CRMCategory;
//   CRM_status: CRMStatus;
//   PS_status: PSStatus;
//   currentALStatus: ALStatus;
// }

// // Define a transition rule
// export interface NextTransition {
//   condition: boolean;
//   nextState: ALStatus;
// }

// export const getNextALStatus = (context: NextContext): ALStatus => {
//   const { CRM_category, CRM_status, PS_status, currentALStatus } = context;

//   // Define the mApproveding of conditions to states
//   const transitions: Record<ALStatus, NextTransition[]> = {
//     DRAFT: [
//       {
//         condition:
//           (CRM_status === 'Unresolved' || CRM_status === 'Updated') &&
//           CRM_category === 'New Position' &&
//           PS_status === 'Proposed',
//         nextState: 'VERIFICATION',
//       },
//       {
//         condition:
//           CRM_status === 'Solved' &&
//           (CRM_category === 'New Position' || CRM_category === 'Classification') &&
//           PS_status === 'Approved',
//         nextState: 'COMPLETED',
//       },
//       { condition: CRM_status === 'Waiting - Client', nextState: 'ACTION_REQUIRED' },
//       {
//         condition:
//           (CRM_status === 'Unresolved' || CRM_status === 'Updated' || CRM_status === 'Waiting - Internal') &&
//           CRM_category === 'Classification' &&
//           PS_status === 'Proposed',
//         nextState: 'REVIEW',
//       },
//     ],
//     VERIFICATION: [
//       { condition: CRM_status === 'Waiting - Client' && PS_status === 'Proposed', nextState: 'ACTION_REQUIRED' },
//       {
//         condition:
//           (CRM_status === 'Unresolved' || CRM_status === 'Updated' || CRM_status === 'Waiting - Internal') &&
//           CRM_category === 'Classification' &&
//           PS_status === 'Proposed',
//         nextState: 'REVIEW',
//       },
//     ],
//     REVIEW: [
//       { condition: CRM_status === 'Waiting - Client' && PS_status === 'Proposed', nextState: 'ACTION_REQUIRED' },
//     ],
//     ACTION_REQUIRED: [
//       // Potentially add transitions if ACTION_REQUIRED needs to change based on conditions
//     ],
//     COMPLETED: [
//       // Completed might be a final state Waiting - Internalth no outgoing transitions
//     ],
//     UNKNOWN: [],
//   };

//   // Check conditions for the current state and return the next state if any condition is true
//   const currentStateTransitions = transitions[currentALStatus];
//   if (!currentStateTransitions) return currentALStatus; // No transitions defined for the current state

//   for (const transition of currentStateTransitions) {
//     if (transition.condition) {
//       return transition.nextState;
//     }
//   }

//   // Return the current state if no conditions are met
//   return currentALStatus;
// };
