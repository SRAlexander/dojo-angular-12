# dojo-angular-12
Getting started with Angular

## 1 - Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
To run this project you will need to have the following installed:
* Node (https://nodejs.org/en/)
* npm (bundled with node - https://www.npmjs.com/)
* Yarn (https://yarnpkg.com/) - yarn is recommended for anyone at Bath due to proxy issues with npm
* Angular CLI (https://cli.angular.io/)
* Visual Studio Code (https://code.visualstudio.com/)
Angular command line interface (CLI) is exactly what it says on the tin, a CLI that will speed up the creation of multiple Angular components. To install through command prompt type
`npm install -g @angular/cli` 
OR 
`yarn global add @angular/cli`

### Installing
Create a new project with the Angular CLI, navigate to the project folder and start the server with the following:
`ng new angular12-dojo --skip-install` (create all the files, don't download the modules yet)*
* Choose y to add routing when prompted
* Choose CSS as stylesheet format when prompted

`cd angular12-dojo`

`npm install` OR `yarn` (downloads the required modules)

`ng serve` OR `yarn start`

You can see the newly created site if you head to http://localhost:4200/ on your browser of choice. You can also ctrl + click the link from the terminal window.

*You may be wondering why we used the `--skip-install` flag? Simply put, if you've made a typo or made a mistake in your default configuration, you've just downloaded a chunk of files for nothing. By using skip-install you can check what is created before downloading all the required modules. The Angular CLI has a lot of flags to speed up the creation of projects that you can explore at a later date but it's a good practice to check what is created from the start.

### Visual Studio Code
The argument is out there on the best development IDE but we shall use Visual Studio Code, you should have grabbed a copy as part of the prerequisites. Open it up and drag you project folder in. Your project should now be open and to make your life easier, you can go to view > integrated terminal to have a CMD terminal open within your environment. Nice!

### Third party components (Bootstrap 4)

If you've not used bootstrap before, you're in for a treat! Bootstrap is a nice library of dynamic components and layout tools that are implemented through html classes. It's not the focal point of this tutorial but we will be using it so let’s install it.

Firstly let’s use npm/Yarn to grab the files. There are major differences between 3 and 4 so make sure you have version 4.

```
npm install bootstrap@4
OR
yarn add bootstrap@4
```

Following that command, you will find a reference to bootstrap in the projects package.json file under "dependencies". You will also find the Bootstrap files in the node_modules folder. It’s worth having a look through these files and understanding what they do at a later date. Finally, we have a reference to include to get it off the ground. In the .angular.json file, within the styles array, add the following to the end:     

```
"node_modules/bootstrap/dist/css/bootstrap.min.css"
```

Congrats, Bootstrap's base styling can now be applied across the project. Let’s now enable Bootstrap's animations; unfortunately Bootstrap relies on JQuery for them. However comp we can get away with JQuery-slim. Once again use npm or Yarn to pull the packages.

```
npm install jquery-slim
OR
yarn add jquery-slim
```

Then, so our application knows about JQuery and the animation scripts, add the following references in the scripts array found in the .angular.json file:

```
"node_modules/jquery-slim/dist/jquery.slim.min.js",
"node_modules/bootstrap/js/dist/util.js",
"node_modules/bootstrap/js/dist/collapse.js"
```

Basic animations have now been added. We won’t be directly using these but you will see how Bootstrap uses them for dynamic purposes through the Dojo. For more information on bootstrap version 4, visit https://getbootstrap.com/docs/4.0/getting-started/introduction/

## 2 - Components
Angular is completely component based, we can use components for full pages or for items that can be used across multiple pages complying with DRY principles. They generally consist of 4 items.
* A Component.ts file which is the Angular structure file.
* A Component.html for what is displayed, .ts binds to this.
* A Component.css or .sass for the html styling.
* A Component.spec.ts for test configurations.

Now, we don’t want to create all four files every time we need a new component, that’s going to become tedious pretty fast, so say hello to the CLI. Type into the console window…

`ng g c components/new-plan` 

You should see the following created.
```
  create src/app/components/new-plan/new-plan.component.html (23 bytes)
  create src/app/components/new-plan/new-plan.component.spec.ts (634 bytes)
  create src/app/components/new-plan/new-plan.component.ts (282 bytes)
  create src/app/components/new-plan/new-plan.component.css (0 bytes)
  update src/app/app.module.ts (492 bytes) 
``` 
Nice! By default, the CLI will create a folder in src/app with the new files and automatically reference it in app.module (we shall look into modules later), so let’s break down the CLI instruction.

ng – Angular CLI
g - generate me 
c – a “C”omponent
components/new-plan – called new-plan in a directory called components

The syntax is the same for all the Angular items that we will create!

For the purpose of the Dojo, we also want another two components called my-plans and my-tags. Have a go at creating them and familiarise yourself with what is created in the files.

## 3 - Modules

### Modules Explained

Modules are essentially packets of references. They import other modules to be used by their components and export their components to other modules. By default every Angular app will have an app.module.ts file which is the primary module where everything else is referenced. Large sections of the app can then be broken down into child modules.

Let’s have a look at our entry point module app.module.ts.

Firstly, at the top of the file you will see a list of imports, anything that will be referenced within the module needs to be included here.

```
import { AppComponent } from './app.component';
import { NewPlanComponent } from './components/new-plan/new-plan.component';
import { MyPlansComponent } from './components/my-plans/my-plans.component';
import { MyTagsComponent } from './components/my-tags/my-tags.component';
```
Under declarations you should be able to see AppComponent and the three previous components created. If not, you should add them here now. This essentially says these components are a part of this module.

```
declarations: [
    AppComponent,
    NewPlanComponent,
    MyPlansComponent,
    MyTagsComponent
  ],
```

The second section is imports, any module or component that is required by one of the declared components needs to be added here. Some of the common project imports used in most projects can be seen below. We will explain more about them later.

```
imports: [
    BrowserModule,
    AppRoutingModule,
    ….
```
There are also two other sections, Providers and Bootstrap which we shall explore later but generally, by design, are not used by the app.module except in specific cases.

### Create a module

Let’s create a module for components that are shared across multiple modules in general. We shall create one using the Angular CLI using:

```
ng g m shared
```

Notice all we’ve done is changed “C”omponent to “M”odule.

We have our shared module! Now, let’s add in some common modules and introduce the exports section.

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [    
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  declarations: []
})
export class SharedModule { }
```

Exports make any component / module contained available to any other module that references this shared module. This means if we have a component declared in a module but not exported, it's private! 

Now we have a shared module, let’s use it. Head back to app.module.ts and remove the two modules above and replace them with SharedModule. Intelisense should then prompt you to add the import reference. If not add...

```
import { SharedModule } from './shared/shared.module';
```

You’ve now created your first module! We won’t be focusing much more on modules since this is a small application but they are worth exploring after this session.

## 4 - Routing

### Routing configuration

We shall now consider the three components added earlier as “pages”. To access them we need to set up routes to them. 

Head to app.module.ts and in the imports add**:

```
RouterModule.forRoot(appRoutes, {useHash : false})
``` 

You should get an Intelisense notification to import the router module. Then, under the imports at the top of the file add in a routes array…

```
const appRoutes: Routes = [
  { path: '', component: NewPlanComponent},
  { path: 'new-plan', component: NewPlanComponent },
  { path: 'my-plans', component: MyPlansComponent },
  { path: 'my-tags', component: MyTagsComponent },
];
```

We have now configured our components to routes! Once we've configured our app core view we will be able to visit these routes. 

Now, you may be thinking this is all nice but what if my module has a lot of components, won’t this become messy? The answer is yes and it is why it's good practise to separate out your routing into its own module!*** You can try this now if you want or after the Dojo.

** If you were in a sub module and wanted to add in another level of routing, you would use .forChild() instead of .forRoot().

*** the Angular CLI provides more magic here, if you know you will be using routing straight from the start you can add the -–routing flag to instantly create you a routing module for app.module.ts

```
ng new angular12-dojo –routing
```

### Using Routes

Now we have our routes, let’s create a navigation menu using bootstrap. Add the following code into app.component.html (replacing all the existing code). It’s simply the demo navigation menu off the bootstrap examples page:

```
<nav class="navbar navbar-expand-md navbar-dark bg-dark">
  <a class="navbar-brand" href="#"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbar">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/my-plans']">My Plans</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/my-tags']">My Tags</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/new-plan']">New Plan</a>
      </li>
    </ul>
  </div>
</nav>

<div id="page-container" class="container">
  <router-outlet></router-outlet>
</div>
```

There are two key parts to take note of in this code, firstly the [routerLink]="['/my-plans']" binding. The routerLink binding essentially sets our “a” tags href parameter to http://localhost:4200/my-plans, therefore, redirecting to it on a click.

Secondly, the router-outlet component <router-outlet></router-outlet>. When we click on the link, the component will be loaded inside these brackets since we’re dealing with a Single Page Application (SPA).

```
<div id="page-container" class="container">
  <router-outlet>
    // My plans component.html will be inserted here
  </router-outlet>
</div>
```

With that, you should now have a snazzy navigation menu with the routing working.

## Bindings

Binding allows us to pass data from the component to the html elements.
We need to be able to send data to the form in HTML Elements, Directives and in our own Components with custom properties and events.

### Handlebars

We use handlebars binding in our new-plan template, for example, as we'll see when we build the form, in the categories dropdown options:
```
<option *ngFor="let cat of categories">{{ cat.body }}</option>
```

### Brackets

In our application we will use bindings in several places, for example, in the new-plan component, we bind the formGroup property to our reactive form, getting [] the data and we bind to the ngSubmit event so setting () the values back to the component.
```
<form [formGroup]="newPlanForm" (ngSubmit)="onSubmit()">
```

## 5 - Reactive Forms

In the reactive approach, the form is created in the component, in Typescript and binded to the html markup for the form.
To get started we need to import the ReactiveFormsModule, we'll add this to our shared.module.ts file:

```
import { ReactiveFormsModule } from '@angular/forms';
```
Don't forget to add it to the exports array in the same file.

Now we can look at our new-plan component. First we import FormGroup, FormControl and Validators from angular/forms:

```
import { FormControl, FormGroup, Validators } from '@angular/forms';
```
We want the form to be created when we initialize the component, so we'll implement OnInit in our class:

```
export class NewPlanComponent implements OnInit {
  newPlanForm: FormGroup;

  ngOnInit() {
    this.newPlanForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      'startingTime': new FormControl(null, Validators.required),
      'finishingTime': new FormControl(null, Validators.required),
      'category': new FormControl(null),
      'location': new FormControl(null, Validators.required)
    });
  }
}
```
If you get a compiler error for newPlanForm, the latest version of typescript requires properties to be initialised, this can be turned off by adding `"strictPropertyInitialization": false` to the tsconfig.json file in the CompilerOptions.

Here we have added some controls for each of the fields we want in the form and will be referenced in the html code. For each form control, we can pass some parameters, the first one is the initial value, the second parameter in this case is a validator. Validator.required will check that the form field contains a value.
We have created a reactive form, however, we need to add the markup in our html file, so in new-plan.component.html we have to add the markup for each of the fields in the form. Here is an example of an input field in the form:

```
<form [formGroup]="newPlanForm">
    <div class="form-group">
    <label for="name">
      <b>Name</b>
    </label>
    <input id="name" type="text" formControlName="name" class="form-control" placeholder="" name="name" />
    <span *ngIf="!newPlanForm.get('name')?.valid && newPlanForm.get('name')?.touched" class="error">Please enter a plan name</span>
  </div>

  <div class="form-group">
    <label for="description">
      <b>Description</b>
    </label>
    <input id="description" type="text" formControlName="description" class="form-control" placeholder="" name="description"
    />
    <span *ngIf="!newPlanForm.get('description')?.valid && newPlanForm.get('description')?.touched" class="error">Please enter a plan description</span>
  </div>
  
  <div class="form-group">
    <label for="location">
      <b>Location</b>
    </label>
    <input id="location" type="text" formControlName="location" class="form-control" placeholder="" name="location"
    />
    <span *ngIf="!newPlanForm.get('location')?.valid && newPlanForm.get('location')?.touched" class="error">Please enter a plan location</span>
  </div>
</form>

```
In this example, we have synced the form and form field, binding the formGroup directive [formGroup]="newPlanForm"
and the name field using the formControlName="name" directive.
Since we added a validator to the form in the component, let’s add a message here, in case the form field is invalid. That is the <span> tag:
*ngIf="!newPlanForm.get('name')?.valid && newPlanForm.get('name')?.touched"

We can complete the form with a submit button:

```
<div class="row">
    <div class="col-12">
      <button type="submit" class="btn btn-success btn-block" [disabled]="!newPlanForm.valid">Add Plan</button>
    </div>
  </div>
```
The disabled directive is binding to the newPlanForm.valid property, in order to disable the button if the form is not valid.

Our form is created, however, nothing happens when we submit it because we have not binded it to a submit event. To see this working we are going to create a method in our component file:

```
onSubmit() {
       console.log('Submitted');
}
```
and create the binding in the html form:

```
<form [formGroup]="newPlanForm" (ngSubmit)="onSubmit()">
```

ngSubmit is a default Angular directive that will trigger when the form gets submitted.

### Adding bootstrap components

We have a couple of fields that we could improve, date, starting and finishing time are a bit boring as input fields. Let’s make use of ngx-bootstrap https://valor-software.com/ngx-bootstrap/
```
npm install ngx-bootstrap --save
OR
yarn add ngx-bootstrap
```
We'll import a couple of components into our app.module file:
```
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
```
and add them to the imports array:
```
BsDatepickerModule.forRoot(),
TimepickerModule.forRoot(),
BrowserAnimationsModule,
```

The date picker also has a custom styling, so let's also add that into the styles array in angular.json

```
"node_modules/ngx-bootstrap/datepicker/bs-datepicker.css"
```

The components are now available to be used in our new-plan component markup:
```
  <div class="form-group">
    <label for="date">
      <b>Date</b>
    </label>
    <input id="date" type="text" bsDatepicker formControlName="date" class="form-control" placeholder="" name="date" />
    <span *ngIf="!newPlanForm.get('date')?.valid && newPlanForm.get('date')?.touched" class="error">Please enter a plan date</span>
  </div>
```
```
<div class="form-group" ngClass="row">
    <div class="col-md-6">
      <label for="startingTime">
        <b>Starting time</b>
      </label>
      <timepicker id="startingTime" formControlName="startingTime" name="startingTime"></timepicker>
      <span *ngIf="!newPlanForm.get('startingTime')?.valid && newPlanForm.get('startingTime')?.touched" class="error">Please enter a plan date</span>
    </div>
    <div class="col-md-6">
      <label for="finishingTime">
        <b>Finishing time</b>
      </label>
      <timepicker id="finishingTime" formControlName="finishingTime" name="finishingTime"></timepicker>
      <span *ngIf="!newPlanForm.get('finishingTime')?.valid && newPlanForm.get('finishingTime')?.touched" class="error">Please enter a plan date</span>
    </div>
  </div>
```
There is an extra component we'll be using. When the form gets submitted, we want to inform the user that their plan has been added to My Plans. We'll use an alert component for this.
```
import { AlertModule } from 'ngx-bootstrap/alert';
```
Add the markup above all form fields:
```
  <alert type="success" dismissOnTimeout="3000" *ngIf="submitted">
    <strong>Yes!</strong> We have a plan.
  </alert>
```
The *ngIf directive is checking for a property called "submitted". We have to set this up in our component and then make it true inside our onSubmit method:
```
submitted = false;
```

```
onSubmit() {
   this.submitted = true;
  }
```

You may have noticed a field in the form called "Category". This is not a simple input field, we'll have a dropdown selector here so we can pick one of the existing categories available from an API. The html markup will look like this:

```
<div class="form-group">
    <label for="category">
      <b>Category</b>
    </label>
    <select id="category" type="text" formControlName="category" class="form-control" placeholder="" name="category">
      <option *ngFor="let cat of categories" [value]="cat.name">{{ cat.name }}</option>
    </select>
  </div>

```
The *ngFor directive loops over an array of categories that will ultimately be provided by a service, meanwhile, we'll create an array in the component file:

```
categories: any[] = [];
```
### Working out the bootstrap components output

Bootstrap's timepicker returns a datetime format with today's date and the time selected, we need to tidy up the data we collect in the form before posting to an API. We'll create a method that compiles the date selected in the datepicker with the times selected for Starting and Finishing time, therefore, Starting and Finishing will contain timestamps with the selected date and times. We don't need to pass the Date output to the API anymore, as it will be contained within the time fields.

In the component we'll create the following method:

```
resolvePlan() {

    const planStart = new Date(this.newPlanForm.value.date.setHours(
                                this.newPlanForm.value.startingTime.getHours(),
                                this.newPlanForm.value.startingTime.getMinutes(),
                                this.newPlanForm.value.startingTime.getSeconds()));
    const planFinish = new Date(this.newPlanForm.value.date.setHours(
                                this.newPlanForm.value.finishingTime.getHours(),
                                this.newPlanForm.value.finishingTime.getMinutes(),
                                this.newPlanForm.value.finishingTime.getSeconds()));

    return ({
    'name': this.newPlanForm.value.name,
    'description': this.newPlanForm.value.description,
    'starting': planStart,
    'finishing': planFinish,
    'category': this.newPlanForm.value.category,
    'location': this.newPlanForm.value.location
  });
  }
```
and in our post service we'll pass this.resolvePlan().

Now, we have our inputs created and acting in a reactive manner so let's tidy them up a bit. Open up the new-plan.css file and insert the following styles:
```
.form-field {
  width: 70%;
}
```

This styling will only work on our component so we can easily define specific styles and extract whole components nicely. If we wanted a global style then we can set it in the master style.css. Since our fixed navigation model hovers over our page, let's add some padding to the page in the global .css to account for that.
```
#page-container{
    padding-top:56px;
}
```

Now every page will have the padding applied to it.

Time to get into Services!

## 6 - Services

Services in Angular are where we manage our API calls. For the purpose of this Dojo we shall be using JSON Server, a mock API tool so we don’t have to create an API. 

### JSON-Server

Let’s install and start-up our API mocker json-server.js. In the terminal enter

```
npm install -g json-server
Or
Yarn add global json-server
```

Once done, grab the db.json file provided and place it in your projects route directory. To start the server, open a new terminal window and enter 

```
json-server --watch db.json
```
  
Now, if you head to http://localhost:3000 you should get a nice response listing all the mocked data responses available. JSON server is a great little tool if you’re co-developing with someone on the back end who may not know what responses you require. With this, you can outline what you’re expecting and vice versa, just by modifying the db.json file.

### Create a service

Using the CLI and the syntax from the previous sections, add a service to app/shared/services/ called plans. 

```
Do it yourself section
```

We also need to add the service to our module. Pop into app.module.ts and add a reference to PlansService under the final declaration type that we will cover, Providers.

A service declared in the providers array is accessible globally, therefore, if we had another module, we can access the service without defining it in that module. There is one exception to this but I’ll direct you to the reason why and where in further resources at the end.

On to the service file, firstly, we need to declare the components we require

```
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
```

The HTTP items are self-explanatory but he RxJS stands for Reactive Extensions for Javascript and allows for the simplification of asynchronous calls through observables and subscriptions. It’s a fairly large library, so to reduce the size of our application, we’re only including the parts we need as opposed to the full library.

Since we're using HttpClientModule, the module needs to know that we’re using them and they exist within the HTTPModules so import the following in your app.module.ts.

```
import { HttpClientModule } from '@angular/common/http';
```

Next, we need to inject the HTTP Client into the service through the constructor, include the following.

```
constructor(private _http: HttpClient) { }
```

Now we’re ready to create an API caller.

### HTTPGET

Let’s add in a function to head off to an API and grab some plans

```
getPlans() : Observable<any> {
    return this._http.get<any>("http://localhost:3000/" + "plans")
      .pipe(
        tap(data => { 
          // Log, set flags, the data will not change if modified here
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError(error.message);
  }
```

Notice the reference to “any” at the moment. If you don’t know what format the data will be in at first, use any and then map to a class or interface at a later stage, before finalising your service. 

We can now set up a subscription to this function in any component that has access to the service, so let’s do that. Open my-plans.component and inject the service through the constructor. 

```
constructor(private _myPlansService : PlansService) { }
```

We also need to add a property called myPlans in the class to hold the data.

```
myPlans : any = [];
```

Then, we will make a call to get the plans during the components initialisation through a subscription. Within the onInit lifecycle hook add the following.

```
ngOnInit() {
    this._myPlansService.getPlans()
      .subscribe(
        response => {
          this.myPlans = response;
        },
        error => {
          console.log("MyPlans getPlans: FAILED");
        }
      )
  }
````

What will now happen, is as the component initialises, an asynchronous call is made to the service which in turn makes a call to the API. It will continue to process through the component until a response is passed back to the service and then back on to the component. If it’s valid, the data will be passed into the response callback, or if an error has occurred it will be passed into the error callback.  

To view what is returned, let's quickly throw a for loop binding into the my-plans.component.html file and view the results.

```
  <div class="row" *ngFor="let plan of myPlans">
    {{plan.id}}
  </div>
```

You should see a list of IDs on the my-plans page if the call has been successful, or an error in the console if something has gone wrong. While we are here and we know data is being returned, change the for loop from above into the following:

```
<div class="row">
  <div class="col-12">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Location</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let plan of myPlans">
          <td>{{plan.name}}</td>
          <td>{{plan.description}}</td>
          <td>{{plan.location}}</td>
          <td>{{plan.category}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

We now have a Bootstrap styled dynamic table! Simple really.
 
We do have one more API get call to create. In our reactive form, we set up a dropdown field to display categories coming from an API endpoint and we need to create a method in our service to pull that information into our component. Let's try creating this new method getCategories, very similar to getPlans but the end point will be /categories instead of /plans.

```
    Do it yourself section
```

Then, in our new-plan component we add the following code, inside ngOnInit:

```
this._myPlansService.getCategories()
      .subscribe(
        data => {
          this.categories = data;
          return data;
        },
        error => {
          console.log("NewPlan getCategories: FAILED");
        }
      );
```

We are assigning the object from our call to the categories array we declared previously. Now our dropdown will have options coming from the API following a successful response.

### HTTPPost

Posting works with promises in exactly the same way as the GET calls except we have to pass in some headers and a body. Let’s create a function to post a plan back to the JSON server.

```
postPlan(plan:any): Observable<any> {
	const body = JSON.stringify(plan);
	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	const options = {headers: headers};
	return this._http.post<any>("http://localhost:3000/" + 'plans', body, options)
	   .pipe(
		tap(data => {
		}),
		catchError(this.handleError)
	   );
}
```

So firstly, we stringify the passed object to the function which will act as our body. We then specify what headers to pass back, in this case we are just passing back the content-type header. Next, we wrap the header in an options object, you can explore what else you can do here at a later date. Finally, we send off the post call with the data and options.

We can now use the post call within the new-plan component we created earlier, head back into the newPlan component and within the onSubmit function add the following subscription:

```
this._myPlansService.postPlan(this.resolvePlan())
      .subscribe(
        data => {
          this.submitted = true;
          this.newPlanForm.reset();
          return true;
        },
        error => {
          console.error('Error!');
          return throwError(error);
        }
      );
```

Hey presto, our form can now submit data correctly. Ultimately, up until this point, we've been a bit naughty - we've been using the any type everywhere which completely removes the power of typescript. If we know what data is being returned from our calls, we should define the responses as a class or an interface.

### Interfaces

Let’s create an interface through the Angular CLI. Since a plan could be used across the product, let's create it in our shared directory under models.
```
ng g i shared/models/IPlan 
```

As a first pass, we're going to define our response type as strings and numbers
```
export interface IPlan {
    name: string;
    description: string,
    starting: string,
    finishing: string,
    location: string,
    id: number,
    category: string
}
```

Then to use this interface, let's replace the returned type of getPlans to an Observable<IPlan[]> and variable myPlans in the my-plans component to IPlan[]. Run the app and head to the My Plans page to see what happens.

All our data loads the same so it's working the same; why bother? Well, by defining our response types as interfaces, we can get on the fly Intelisense recommendations and compile time errors within the development environment. The typescript compiles down to JS so it does not affect the running of the application. 

However, this can throw up some issues. HTTP GET and POST responses can get past the interface definitions so objects could be missing fields. They cannot however be bypassed, if they are mapped after the call. Mapping also allows us to split out fields if we require it.

Let’s have a quick look at the GetPlans HTTP GET call again

```
return this._http.get<IPlan[]>("http://localhost:3000/" + 'plans')
      .pipe(
	tap(data => { }),
        map((results) => 
          results.map(res => ({
            name : res.name,
            description : res.description
          }) as IPlan)
        ),
        catchError(this.handleError)
      );
```

With the map function, we can pick out what fields to pass on to our subscriptions whereas the tap function is great for logging or conditional setters. If we want to enforce all fields of the interface we can define it here.

```
let result : IPlan;
result = {
    name : res.name,
    description: res.description,
    starting: res.starting,
    finishing: res.finishing,
    location: res.location,
    id: res.id,
    category: res.category
}
return result;
```

This allows us the option to check each value of the response, to make sure any items that are critical are not null and we can separate combined data items like datetimes into separate variables if we need to! 

## 7 - Components as Components

So far, we’ve looked at components in the context of pages, however, they are much more powerful than that. Let’s say we have a feature that needs to work in exactly the same way wherever it is used. In our case, an error notification. We don’t want to duplicate the html and functionality on every page. 

Let’s create a new component called error-notification in the shared folder

```
ng g c shared/components/error-notification
```

The component will be automatically added to the shared module. Nice! This component will be exported so you will need to add it to the exports array manually.

Let’s head into the error-notification.component.html file and add a nice alert warning…

```
<div class="alert alert-danger">
  An error has occurred
</div>
```

Job done. We now have a very quick error notification which will look and act in the same way wherever we use it. But how do we use it?

Have a look in the error-notifications.component.ts file, you should see that in the component declaration we have 

```
selector: 'app-error-notification'
```

This is essentially an ID to the component and with this ID, we can insert the component into any other component that has access to the component through…

```
<app-error-notification></app-error-notification>
```   

Let’s place this at the top of the new-plan.component.html file and run the application to see what happens. You should see an alert bar at the top of the page, nice! You’ve just created your first modular component. Of course, there’s much more we can do with this. Different pages may require a different error message, let’s explore this next. 

***Component Input***

Head to the error-notification.ts file and add the following

	export class ErrorNotificationComponent implements OnInit {
		@Input() message : string = "";

The component now knows to expect a string called message to be passed in, or if it’s not, then it defaults to an empty string. We can now bind the value into our html using handlebars.

	<div class="alert alert-danger">
	  Error: {{message}}
	</div>

Finally, we need to pass the input message into the component. We can bind this on each page that uses the component through its declaration.

	<app-error-notification [message]="'An unknown error has occurred'"></app-error-notification>

We can now pass in custom messages to our component, nice!

***Outputs***

Outputs in child components are a little more complex and require an EventEmitter, we can consider them to be callbacks. To pass an output value back to a top level component requires some bindings and use of the EventEmitters .emit function.

Firstly, add an output declaration under the existing input declaration.

	@Output() dismissError : EventEmitter<boolean> = new EventEmitter<boolean>();

For proof of concept we’re going to pass back a boolean value. We then need to create a function to call the emitter.

	onDismissError(){
	  this.dismissError.emit(true);
	}

Let’s add a button within the components html file that binds to this function.

	<div class="row">
	  <div class="col-8"></div>
	  <div class="col-4">
		<button class="btn btn-primary btn-block" (click)="onDismissError()">Dismiss Error</button>
	  </div>
	</div>

At this point, our component now has a functional output binder but we’ve not configured anywhere to use it yet. It should also be noted that the component will work without a top level binding so you can use it as you require it. For the next step, we shall configure the new-plan page to bind to this callback.

Firstly, let's add a Boolean to monitor if an error has occurred within the new-plan component. For now, it will be set to true to show our component.

	hasErrorOccurred : boolean = true;

Secondly, in the html file, let's wrap our component in an if binded div based on this new variable, the plan is to hide the error once it’s dismissed.

	<div *ngIf="hasErrorOccurred">
	  <app-error-notification [message]="'An unknown error has occurred'"></app-error-notification>
	</div>

Back to the .ts file, now we need to create the callback function, this will simply set hasErrorOccured to false if it is called.

	onErrorDismissed() {
	  this.hasErrorOccurred = false;
	}

We can then bind this to our child component in the html file using () brackets.

	(dismissError)="onErrorDismissed()"

We now have a working output callback; give the button a go.

The final note to make on this is that the emitter can pass back an object. We originally passed back a Boolean value of “true” but it’s currently not being used. We can easily configure the last two code snippets to work with the any object.

	(dismissError)="onErrorDismissed($event)"

And

	onErrorDismissed(result : boolean) {
	  this.hasErrorOccurred =!result;
	}

With this knowledge you can go forward and make completely dynamic components, ultimately reducing duplications and creating consistent application behaviour.


## 8 - Dynamic Configurations

So far we’ve been hard coding our URLs into our services. What happens when we release the application and localhost is no longer our API location? Bring in the configuration files.

Firstly, let’s take a look in the environments folder and we should be able to see two files, environment.ts and environment.prod.ts, inside them we should see i simple varibale model with production: false or production: true pending on the file. Lets add in a new variable for our endpoint like such...

	export const environment = {
	  production: false,
	  apiEndpoint: "http://localhost:3000/"
	};

In our prod file, set the same variable butlets set it to 3001, it will fails but we should be able to see the change in our network traffic.

Secondly we need to access the variable, in a suitable place, within the plans.service.ts file, import our environment file by...

	import { environment } from '../../../environments/environment';
	
We only ever target our base environment file!
Next we can rewrite our http.get statament to use the environment model...

	getPlans() : Observable<any> {
		return this._http.get<any>(environment.apiEndpoint + "/plans")
		  .pipe(
			tap(data => { 
			  // Log, set flags, the data will not change if modified here
			}),
			catchError(this.handleError)
		  );
	  }

Now lets run our application via "ng serve". Once up and running open up the developer tools (F12 in chrome) and tab across to the networks tab. Head to the My Plans page and we should see an api call made to localhost:3000 as before. Success our variable is being loaded from a file.
Next up run "ng serve --configuration production". Watch the network tab again and we should see localhost:3001 being hit. Double success, but why?

Have a look at the angular.json file and we should see a configurations object and within that a fileReplacements object...

	"fileReplacements": [
		{
		  "replace": "src/environments/environment.ts",
		  "with": "src/environments/environment.prod.ts"
		}
	],

So we will still target a single file but when we run the application in production angular has already managed to replace the file for us.
  

## 8.5 - Testing

We will be focussing on Karma tests in this Dojo, you can also explore e2e tests after. To run tests type:


	yarn test
	Or 
	ng test


Yes, you already have some! This command will open up a new browser window and run through the tests specified in your .spec files. Unfortunately, the default tests now all fail. Boooo! We shall now identify some common issues in testing and try to fix the tests.

**Routing in testing**

The spec files need to import the items that they will be using in order to run, one of the main items to import and is often forgotten is the routing module. Head into the app.component.spec file and update it to the following:


	import { TestBed, async } from '@angular/core/testing';
	import { AppComponent } from './app.component';
	import {RouterTestingModule} from '@angular/router/testing';

	describe('AppComponent', () => {
	  beforeEach(async(() => {
		TestBed.configureTestingModule({
		  imports: [
			RouterTestingModule
		  ],
		  declarations: [
			AppComponent,
		  ],
		  providers: [

		  ],
		}).compileComponents();
	  }));
	  it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	  }));
	  it(`should have as title 'app'`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('Weekend Planner');
	  }));
	});
	

Here we can see we have a configureTestingModule which works in a similar way to a normal module, importing and declaring the components we require to run a unit of code. The main import to take notice of here is the RouterTestingModule which allows us to run the tests without importing the full routing module. 

Familarise yourself with the processes while you’re here, particularly what conditions you can check against and what you can check on within the component using Intelisense.

**Mocks** 

Another important feature that is required within our tests is to be able to mock our services. Since these are unit tests, we don’t want to be relying on 101 other components that could also fail against any given test. Let’s update plans.service.spec file with the following: 

	import { TestBed, getTestBed, inject } from '@angular/core/testing';
	import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

	import { PlansService } from './plans.service';
	import {HttpClient, HttpClientModule, XhrFactory, } from '@angular/common/http';
	import { AppConfig} from '../../app.config';

	describe('PlansService', () => {

	  class MockConfig {
		getConfig() {
		  return 'http://localhost:3000/';
		}
	  }

	  beforeEach(() => {
		TestBed.configureTestingModule({
		  imports: [
			HttpClientModule],
		  providers: [
			PlansService,
			{
			  provide: AppConfig, useClass: MockConfig
			}
			]
		});

	  });

	  it('should be created', inject([
		PlansService], (service: PlansService) => {
		expect(service).toBeTruthy();
	  }));
	});



Here we can see the MockConfig class that implements a return URL for the function getConfig(). We then register the AppConfig service in the providers, telling it to use the MockConfig class we just created. Now we have full control over what our service will receive when it injects the service during construction, isolating our tests to a unit of code!

**Further Testing**  

There are multiple ways in which you can test you code, have a play with what’s available, fix the existing testing issues and for further ideas, have a look at the .spec files contained within the Dojo repository.  

## 9 - Deployment

Type... 

	ng build –prod


All your files will be built into a dist folder which you can push up to IIS or another hosting service as you feel fit. Easy! 

For a deeper understanding of whats going on, you can explore Best Practises by Jim Cooper, referenced in Further Resources.

As a reference, we can go one step further and Dockerise our app, for the purpose of this Dojo this will be extra work but here is a default dockerfile for Angular... 

	FROM node:10
	# stage 1

	FROM node:alpine AS my-app-build
	ARG BUILDENV=local
	WORKDIR /app
	COPY . .
	# RUN BUILDENV
	RUN npm install && npm run build -- --configuration=${BUILDENV}

	# stage 2

	FROM nginx:alpine
	COPY --from=my-app-build /app/dist/fds-ui /usr/share/nginx/html
	COPY --from=my-app-build /app/nginx.conf /etc/nginx/conf.d/default.conf
	EXPOSE 80
