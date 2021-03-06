# Form Approval App

Sample application for government officials to approve and reject forms.

This app is built using Ionic React, and consumes data from a DRF API hosted on AWS.



## Functionality

This app allows 3 different user roles to login and view forms to submitted to them that are pending review. The users can take a number of actions (approve/forward for review/reject) and can add comments to their review. The users can also see a dashboard showing the location of forms within their organization. 

This app was built as an add-on to a pre-existing Django web app which I also was the lead developer on.


## Authorization and User Roles


The app contains 3 seperate user roles. The authorization and re-direction is handled by the higher-level Route components in `src/App.js`. 
User state management is handled by React Context in `src/context`. React Context is also used, together with native SQLite storage, to handle the DRF authentication token.

Each of the 3 user roles have a seperate IonRouterOutlet, which is wrapped around the protected router in the higher level router - thereby making all the routes in the lower level IonRouterOutlet protected:

```
src/App.js IonReactRouter
        └──IonRouterOutlet
             |
             └── <AuthRoute path="/mof" component={MoFApp} category={['Minister']}/>
             |    └── src/apps/MinisterOfFinance/App.js IonRouterOutlet
             |           └── Minister of Fincance user role Routes, all protected 
             |            
             └── <AuthRoute path="/fs" component={FSApp} category={['Financial Secretary']}/>
             |    └── src/apps/FinancialSec/App.js IonRouterOutlet
             |           └── Financial Secretary Routes, all protected 
             |
             └── <AuthRoute path="/mdamin" component={MDAMinApp} category={['Minister (MDA)']}/>
                 └── src/apps/MDAMinApp/App.js IonRouterOutlet
                        └── MDA Minister Routes, all protected
```
                            

Components and pages that are shared across all/several user roles can be found in the `src/components` and `src/pages` directories.


## Native Compilation

The `android` folder contains code compiled to native Android, and the `iOS` folder contains code compiled to native iOS.
