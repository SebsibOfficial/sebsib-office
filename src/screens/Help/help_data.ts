import { Props as HelpI } from "../../components/Sb_Help/Sb_Help";
import GF from '../../assets/72kg.gif';

const helpData:HelpI[] = [
  {
    id: 'hlp_1',
    title: 'Definitions',
    desc1: [`<ul class="c3 lst-kix_5wey96u3y2rc-1 start"> <li class="c5 li-bullet-0"><span class="c0">Member: A user in the Sebsib system. Can be either an Analyst or Enumerator.</span></li>
    <li class="c5 li-bullet-0"><span class="c0">Owner: The user who controls the account/organization. Can create members</span></li>
    <li class="c5 li-bullet-0"><span class="c0">Analyst: A role that allows access to view the collected responses and  create surveys. Has only Sebsib Office / website access</span></li>
    <li class="c5 li-bullet-0"><span class="c0">Enumerator: A role that has access to the Sebsib Collect App. It can collect responses</span></li>
    <li class="c5 li-bullet-0"><span class="c0">Project: A collection of surveys. Has assigned enumerators who can access these surveys and collect responses</span></li>
    <li class="c5 li-bullet-0"><span class="c0">Survey: Simply the questionnaire that enumerators collect responses on.</span></li>
    <li class="c5 li-bullet-0"><span class="c0">Responses: The collected data from the enumerators</span></li>
    <li class="c5 li-bullet-0"><span class="c0">Forms are surveys that are not filled yet. They may be used interchangeably </span></li>
  </ul>`].join(''),
  },
  {
    id: 'hlp_2',
    title: 'Create Project',
    desc1: [`<ol class="c3 lst-kix_5wey96u3y2rc-2 start" start="1">
    <li class="c1 li-bullet-0"><span class="c0">Click on the Projects sidebar</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Enter the name of the Project</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Select the enumerators you want to be involved in the project. If you
        don&rsquo;t have any enumerators you can create them. You don&rsquo;t necessarily need an enumerator, you can
        use your credentials to access the Sebsib collect app to gather responses if you are an account owner.</span>
    </li>
    <li class="c1 li-bullet-0"><span class="c0">After you are done, click Create to create your project.</span></li>
  </ol>`].join(''),
    img1: GF
  },
  {
    id: 'hlp_3',
    title: 'Create Members',
    desc1: [`<ol class="c3 lst-kix_5wey96u3y2rc-2 start" start="1">
    <li class="c1 li-bullet-0"><span class="c0">Click on the Members sidebar</span></li>
    <li class="c1 li-bullet-0"><span class="c0">You will see all the members currently in your
        account/organization</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Click on Create Member</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Enter the First &amp; Last name, email, password phone and role (Role
        can be either Analyst: who only has access to Sebsib Office / website or Enumerator who only has access to
        Sebsib Collect / Mobile app)</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Copy the password somewhere safe before you click Create</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Now click Create Member and hand over the credentials to you
        enumerators</span></li>
  </ol>`].join(''),
  },
  {
    id: 'hlp_4',
    title: 'Remove Enumerators From Projects',
    desc1: [`<ol class="c3 lst-kix_5wey96u3y2rc-2 start" start="1">
    <li class="c1 li-bullet-0"><span class="c0">Click on Projects sidebar</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Find the project you are looking for</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Select the enumerator you want to remove and click the &lt;&gt;
        button</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Now the enumerator has no access to the surveys in the project</span>
    </li>
  </ol>`].join(''),
  },
  {
    id: 'hlp_5',
    title: 'Editing Members',
    desc1: [`<ol class="c3 lst-kix_5wey96u3y2rc-2 start" start="1">
    <li class="c1 li-bullet-0"><span class="c0">Click on Member sidebar</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Click on the Member name you want to edit</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Change the contents you to your liking</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Click Save Changes to finish</span></li>
  </ol>`].join(''),
  },
  {
    id: 'hlp_6',
    title: 'Creating Surveys',
    desc1: [`<ol class="c3 lst-kix_5wey96u3y2rc-2 start" start="1">
    <li class="c1 li-bullet-0"><span class="c0">Click on the Project sidebar</span></li>
    <li class="c1 li-bullet-0"><span>Select a Project to add this survey on and click </span><span class="c6 c8">Create
        Survey</span></li>
    <li class="c1 li-bullet-0"><span class="c0">You will see a screen with survey name field and a purple square with
        fields in it</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Enter the survey name</span></li>
    <li class="c1 li-bullet-0"><span class="c0">The square represents a question, it has three main fields. </span></li>
  </ol>
  <ul class="c3 lst-kix_5wey96u3y2rc-3 start">
    <li class="c2 li-bullet-0"><span class="c0">The question text (e.g what is you favorite color)</span></li>
    <li class="c2 li-bullet-0"><span class="c0">The input type (e.g choice, text, date, number&hellip;)</span></li>
    <li class="c2 li-bullet-0"><span class="c0">The show pattern (e.g Show this question if a previous question was
        false)</span></li>
  </ul>
  <ol class="c3 lst-kix_5wey96u3y2rc-2" start="6">
    <li class="c1 li-bullet-0"><span class="c0">Enter the question text</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Choose and Input type from the following:</span></li>
  </ol>
  <ul class="c3 lst-kix_5wey96u3y2rc-3 start">
    <li class="c2 li-bullet-0"><span class="c0">Text: Free written inputs</span></li>
    <li class="c2 li-bullet-0"><span class="c0">Choice: Select on from the options</span></li>
    <li class="c2 li-bullet-0"><span class="c0">Multi-select: Select one or many from the options</span></li>
    <li class="c2 li-bullet-0"><span class="c0">Number: If you want Numerical data</span></li>
    <li class="c2 li-bullet-0"><span class="c0">Geo-point: If you want GPS locations</span></li>
    <li class="c2 li-bullet-0"><span class="c0">Date: If you want Date data from the calendar</span></li>
    <li class="c2 li-bullet-0"><span class="c0">Time: If you want time date from the clock</span></li>
    <li class="c2 li-bullet-0"><span class="c0">File: If you want to receive files</span></li>
    <li class="c2 li-bullet-0"><span class="c0">Photo: if want photo data</span></li>
    <li class="c2 li-bullet-0"><span>Multi-[date, geo-point, time, file, number, text]: if you want any of the options
        in the bracket but want more than one per question. (e.g.1 </span><span
        class="c6">Question:</span><span>&nbsp;At what times do you take these pills? </span><span
        class="c6">Answer</span><span>: At 10:30 AM, 4 PM and 10 PM) (e.g.2 </span><span
        class="c6">Question</span><span>: What were your last 3 summer harvests in quintals? </span><span
        class="c6">Answer: </span><span class="c0">70, 80, 90 )</span></li>
  </ul>
  <ol class="c3 lst-kix_5wey96u3y2rc-2" start="8">
    <li class="c1 li-bullet-0"><span>Set the </span><span class="c6">required </span><span class="c0">field if you
        don&rsquo;t want the question to be skippable</span></li>
    <li class="c1 li-bullet-0"><span>Set the Show pattern. The showing conditions of a question can only be determined
        by previous questions whose input types are either choice or multi-select. So to specify which question click on
      </span><span class="c6">Show If Question</span><span>&nbsp;then select which question, and specify an answer by
        clicking on </span><span class="c6">Answer is</span><span class="c0">&nbsp;then selecting one of the
        choices.(E.g Show if question #1 Answer is Choice #2)</span></li>
    <li class="c1 li-bullet-0"><span>After setting all the above you must click on </span><span class="c6">Confirm
      </span><span class="c0">to add the question to the list</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Next add another question by click on New Question from the bottom right
        and repeat the above process</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Once you are done, click on Preview Survey to see what the
        survey/questionnaire looks like.</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Click Create survey to create the survey</span></li>
  </ol>`].join(''),
  },
  {
    id: 'hlp_7',
    title: 'Editing Account Settings',
    desc1: [`<ol class="c3 lst-kix_5wey96u3y2rc-2 start" start="1">
    <li class="c1 li-bullet-0"><span class="c0">Click on the &lt;&gt; icon bottom left of the screen. The 8 character
        word is your organization ID</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Change the information to your liking. You can also clearly see your
        organization ID </span></li>
    <li class="c1 li-bullet-0"><span class="c0">Click on Save Changes to finish</span></li>
  </ol>`].join(''),
  },
  {
    id: 'hlp_8',
    title: 'Viewing and Downloading Data',
    desc1: [` <ol class="c3 lst-kix_5wey96u3y2rc-2 start" start="1">
    <li class="c1 li-bullet-0"><span class="c0">Click on the Project sidebar the click on the survey you want view or
        click on the survey directly from the dashboard</span></li>
    <li class="c1 li-bullet-0"><span class="c0">The table is the current gathered response. The column are the question
        you created and each row it the response recorded</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Click on Preview Questionnaire to view the question clearly</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Click on the Download Excel to export the data to Microsoft Excel
        (.xlsx) format</span></li>
  </ol>`].join(''),
  },
  {
    id: 'hlp_9',
    title: 'Setting Up Sebsib Collect',
    desc1: [`<ol class="c3 lst-kix_5wey96u3y2rc-2 start" start="1">
    <li class="c1 li-bullet-0"><span class="c0">When opening Sebsib Collect, you will see three buttons to fill forms,
        download forms, and send forms. There is a &lt;&gt; icon at the top right screen. Click the &lt;&gt; icon</span>
    </li>
    <li class="c1 li-bullet-0"><span class="c0">Enter the enumerator email, password and Organization ID. If you are the
        owner you can enter your credentials and the Organization ID. </span></li>
    <li class="c1 li-bullet-0"><span class="c0">Then click on Save to connect with Sebsib office.</span></li>
    <li class="c1 li-bullet-0"><span class="c0">The bar at the bottom will turn purple if you are successfully
        connected.</span></li>
  </ol>`].join(''),
  },
  {
    id: 'hlp_10',
    title: 'Downloading Forms',
    desc1: [`<ol class="c3 lst-kix_5wey96u3y2rc-2 start" start="1">
    <li class="c1 li-bullet-0"><span class="c0">Click on the Download forms button. You must be connected to the
        internet for this to work</span></li>
    <li class="c1 li-bullet-0"><span class="c0">You will see the list of forms to fill</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Select the forms and Click Download Selected Forms to store them on the
        device for offline use.</span></li>
  </ol>`].join(''),
  },
  {
    id: 'hlp_11',
    title: 'Filling out Forms',
    desc1: [`<ol class="c3 lst-kix_5wey96u3y2rc-2 start" start="1">
    <li class="c1 li-bullet-0"><span class="c0">Click on the Fill Forms button. You don&rsquo;t need the internet for
        this one.</span></li>
    <li class="c1 li-bullet-0"><span class="c0">You will see a list of downloaded surveys</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Click the one you want to fill and proceed to fill out the
        questions</span></li>
    <li class="c1 li-bullet-0"><span class="c0">When you finish, give it a label for identification when sending</span>
    </li>
    <li class="c1 li-bullet-0"><span class="c0">It is now stored locally and ready to be sent</span></li>
  </ol>`].join(''),
  },
  {
    id: 'hlp_12',
    title: 'Sending Forms',
    desc1: [`<ol class="c3 lst-kix_5wey96u3y2rc-2 start" start="1">
    <li class="c1 li-bullet-0"><span class="c0">Click on the Send Forms button. You must be connected to the internet
        for this to work</span></li>
    <li class="c1 li-bullet-0"><span class="c0">You will the all the form you filled, with the labels you
        provided</span></li>
    <li class="c1 li-bullet-0"><span class="c0">Select the Forms and Click Send the Selected Forms. They are now sent to
        the Sebsib office for viewing</span></li>
  </ol>`].join(''),
  },
]

export default helpData ;