# Form Approval App

Sample application for government officials to approve and reject forms.

This app is built using Ionic React, and consumes data from a DRF API hosted on AWS.


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



