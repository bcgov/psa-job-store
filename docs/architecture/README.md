![Architecture diagram](architecture.drawio.png?raw=true)

This diagram represents a high-level architecture of a system integrating multiple components for authentication, frontend and backend services, and external systems like CRM (Customer Relationship Management) and PSA (PeopleSoft Application). Here's a brief description of the components and their interactions:

---

### **1. Web Browser**

- **React OIDC & PJS**: PSA Jobstore frontend application built with React, using OpenID Connect (OIDC) for authentication.

---

### **2. Authentication (OCIO Hosted)**

- **SiteMinder**: Provides a common logon page for user authentication.
- **Active Directory**: Manages user credentials (IDIR and BCeID accounts).
- **Keycloak**: Acts as an identity provider, managing authentication tokens in the "PSJ Standard Realm."

---

### **3. OpenShift Cluster**

- Hosted in two environments:
  - **GOLD OpenShift Cluster**: Hosts Keycloak for authentication.
  - **SILVER OpenShift Cluster**: Hosts the main application components:
    - **Frontend**: React-based UI.
    - **Backend**: Built with NestJS, handling business logic.
    - **PostgreSQL**: Database schema to store application data.

---

### **4. TELUS Infrastructure**

- Integrates with Oracle Service Cloud (21C) via CRM REST APIs to:
  - Create incidents.
  - Retrieve incidents.
  - Update incidents.

---

### **5. PSA On-Prem (TELUS Data Centres)**

- Integrates with PeopleSoft HCM (Human Capital Management) system:
  - **Integration Broker**: Facilitates communication via REST APIs for data retrieval and updates.
    - `Data GET Web Service`: Fetches data from PeopleSoft.
    - `Data Update Web Service`: Updates data in PeopleSoft.
  - **Application Server**:
    - Uses PeopleCode handlers and Component Interfaces to interact with the backend database.

---

### **Key Interactions**

1. Users authenticate via SiteMinder/Keycloak using Active Directory credentials.
2. The frontend communicates with the backend hosted in the SILVER OpenShift cluster.
3. Backend services interact with:
   - PostgreSQL for data storage.
   - TELUS CRM endpoints to manage incidents.
   - PSA PeopleSoft APIs for HCM-related data.

### Notes

Architecture Diagrams have been created in [DrawIO](https://drawio-app.com/) format, as the file is in plain text format and can be version controlled.

To update the diagram, use the [online platform](https://app.diagrams.net/) or [install](https://github.com/jgraph/drawio-desktop) locally for offline use. Optionally, export as an `.svg` and `.png` format (replacing the prior image).
