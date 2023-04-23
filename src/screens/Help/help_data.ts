import { Props as HelpI } from "../../components/Sb_Help/Sb_Help";
import cm from '../../assets/help/create_member.gif';
import cp from '../../assets/help/create_project.gif';
import em from '../../assets/help/edit_member.gif';
import re from '../../assets/help/remove_enum.gif';
import su from '../../assets/help/setting_update.gif';
import vs from '../../assets/help/view_survey.gif';

const helpData:HelpI[] = [
  {
    id: 'hlp_1',
    title: 'Definitions',
    desc1: [`<ul class="c3 lst-kix_5wey96u3y2rc-1 start"> <li class="c5 li-bullet-0"><span class="c0">Member: A user in the Sebsib system. Can be either an Analyst, Enumerator or Viewer.</span></li>
    <li class="c5 li-bullet-0"><span class="c0">Owner: The user who controls the account/organization. Can create members</span></li>
    <li class="c5 li-bullet-0"><span class="c0">Analyst: A role that allows access to view the collected responses and  create surveys. Has only Sebsib Office / website access</span></li>
    <li class="c5 li-bullet-0"><span class="c0">Enumerator: A role that has access to the Sebsib Collect App. It can collect responses</span></li>
    <li class="c5 li-bullet-0"><span class="c0">View: A role that can view collected survey data, is created by owners with view access to allowed surveys</span></li>
    <li class="c5 li-bullet-0"><span class="c0">Project: A collection of surveys. Has assigned enumerators who can access these surveys and collect responses</span></li>
    <li class="c5 li-bullet-0"><span class="c0">Survey: Simply the questionnaire that enumerators collect responses on.</span></li>
    <li class="c5 li-bullet-0"><span class="c0">Responses: The collected data from the enumerators</span></li>
    <li class="c5 li-bullet-0"><span class="c0">Forms are surveys that are not filled yet. They may be used interchangeably </span></li>
  </ul>`].join(''),
  },
  {
    id: 'hlp_2',
    title: 'Create Project',
    desc1: [`<p>
    Project will hold all your related surveys together and enumerators who
    have access to the surveys in it, they are basically like folders.
    </p>
    <ul type="disc">
    </ul>
    <ol start="1" type="1">
        <li>
            After signing in, click the projects tab on the left. Then click in
            Create Project.
        </li>
        <li>
            Enter the project name and the description of the project.
        </li>
        <li>
            Then select the enumerators who will be collecting data on the surveys
            in the project
        </li>
        <li>
            Click Create Project to finish creating the project
        </li>
    </ol>`].join(''),
    img1: cp
  },
  {
    id: 'hlp_3',
    title: 'Create Online Survey',
    desc1: [`<p>
    There are two kinds of surveys you can create. Regular/Enumerator-based and
    Online Surveys. Online surveys are survey that are done on the internet by
    sharing links. Much like google forms.
    </p>
    <ul type="disc">
    </ul>
    <ol start="1" type="1">
        <li>
            After signing in, click on Projects then click on Create Survey in the
            project you want to create the survey in.
        </li>
        <li>
            Click on Online Survey
        </li>
        <li>
            Enter the survey name you want to Identify it and to be shown to
            respondents
        </li>
        <li>
            You can upload a survey thumbnail that will be shown to respondents. NB
            The image shows best if it is in 3:1 (width:3, height:1)
        </li>
        <li>
            Enter the description on the survey, this will also be shown to the
            respondents
        </li>
        <li>
            Now enter the questions, Enter the question text in the left most field
            (Question in English)
        </li>
        <li>
            Then enter the input type. You have 6 options (Choice, Multi-Select,
            Number, Text, Date and File Upload). If choice and Multi-select are
            chosen, there will be a field to enter what the choices are.
        </li>
        <li>
            If the question is a required, you can select the Required Checkbox
            next to input type
        </li>
        <li>
            If you want to have conditional display of question, select the Show
            pattern checkbox. Then fill in the condition by select what question
            this question depends on and the choice/option that will make this
            question show up.
        </li>
        <li>
            After you are done with these details, you can add another question be
            clicking on the New Question button and repeat the above process.
        </li>
        <li>
            If you are done with creating the survey, click on preview survey to
            see the questionnaire version of the survey to confirm if everything is
            alright
        </li>
        <li>
            Then now you can click on Create Survey to finish creating the Online
            Survey
        </li>
    </ol>`].join(''),
    img1: cm
  },
  {
    id: 'hlp_4',
    title: 'Create Standard Survey',
    desc1: [`<p>
    There are two kinds of surveys you can create. Standard/Regular
    (Enumerator-based) and Online Surveys. Standard/Regular (Enumerator-based)
    are surveys which require the app to be collected. The will be downloaded
    on the app and will work offline in remote areas.
</p>
<ul type="disc">
</ul>
<ol start="1" type="1">
    <li>
After signing in, click on Projects then click on        <strong>Create Survey</strong> in the project you want to create the
        survey in.
    </li>
    <li>
        Then click on <strong>Standard Survey</strong>
    </li>
    <li>
        Enter the survey name you want to identify it with
    </li>
    <li>
        Now enter the questions. Enter the question text in the left most field
        (Question in English). If you want additional languages to display the
        question text, click on <strong>Add Question language</strong> (which
        supports Amharic, Oromiffa, Tigrigna)
    </li>
    <li>
        Then enter the input type. You have 16 options.
    </li>
</ol>
<p>
    a) <strong>Choice</strong>: Only choose one among options, there will be a
    field to enter the choice details
</p>
<p>
    b) <strong>Multi-select</strong>: You can choose multiple among options,
    there will be a field to enter the choice details
</p>
<p>
    c) <strong>Text</strong>: The input will be any textual input
</p>
<p>
    d) <strong>Number</strong>: The input will be numerical, there will be
    field to specify expected maximum and minimum value
</p>
<p>
    e) <strong>Date</strong>: The input will be of date type, YYYY-MM-DD
</p>
<p>
    f) <strong>File Upload</strong>: The input will be a file that is uploaded
    to a server
</p>
<p>
    g) <strong>Geo-Point</strong>: The input is coordinates chosen on a map
    (requires internet)
</p>
<p>
    h) <strong>Time</strong>: The input will be a time input from a clock, will
    be read in 24-hour
</p>
<p>
    i) <strong>Photo Capture</strong>: The input will be a photo uploaded to
    the server, captured by a camera
</p>
<p>
    j)
    <strong>
        Multi-[Number, Text, Date, File Upload, Geo-Point, Time, Photo Capture]
    </strong>
    : These are the same as above options when one question needs multiple
    inputs, usually used to capture tabular data
</p>
<ul type="disc">
</ul>
<ol start="6" type="1">
    <li>
        If the question is a required, you can select the Required Checkbox
        next to input type
    </li>
    <li>
        If you want to have conditional display of question, select the Show
        pattern checkbox. Then fill in the condition by select what question
        this question depends on and the choice/option that will make this
question show up. If you want more complex patterns click on        <strong>Add Show Pattern </strong>to add another condition for the
        question to show up.
    </li>
    <li>
        After you are done with these details, you can add another question be
        clicking on the New Question button and repeat the above process.
    </li>
    <li>
        If you are done with creating the survey, click on preview survey to
        see the questionnaire version of the survey to confirm if everything is
        alright
    </li>
    <li>
        Then now you can click on Create Survey to finish creating the Online
        Survey
    </li>
</ol>`].join(''),
    img1: re
  },
  {
    id: 'hlp_5',
    title: 'View Survey',
    desc1: [`<p>
    1. After signing in, click on survey on the Dashboard or click on projects
    and click on a survey there
</p>
<p>
    2. Among the option, you can click on View Questionnaire to view the survey
    questions as a plain questionnaire.
</p>
<p>
    3. You can click on Edit survey to modify the survey
</p>
<p>
    4. You can click on Download Excel to get the survey data in MS Excel
    format
</p>
<p>
    5. You can delete the survey by clicking on Delete Survey
</p>
<p>
    6. You can stop data collection if you toggle the started switch to stopped
</p>
<p>
    7. In online survey, a link is displayed under the name, you can share that
    to respondents to fill in the survey.
</p>
`].join(''),
    img1: em
  },
  {
    id: 'hlp_6',
    title: 'Create Members',
    desc1: [`<p>
    There are three types of members: Enumerators (Access the app only),
    Analysts (Access all the projects and surveys) and Viewers (only view
    allowed surveys).
</p>
<p>
    1. After signing in, click on Members and click on Add Member
</p>
<p>
    2. Enter First and Last name, Phone number, email, Password
</p>
<p>
    3. On the role, select Enumerator, Analyst or Viewer
</p>
<p>
    4. If the role selected is Enumerator, then on the right specify which
    project they should be involved in.
</p>
<p>
    5. If the role selected is Viewer, then on the right select which surveys
    the can view
</p>
<p>
    6. After that click on Add Member to finish
</p>
`].join(''),
  },
  {
    id: 'hlp_7',
    title: 'Edit Settings',
    desc1: [`<p>
    1. After signing in, click on the &lt;setting&gt; icon
</p>
<p>
    2. Modify the details you want
</p>
<p>
    3. Click Save Changes to finish
</p>
`].join(''),
    img1: su
  },
  {
    id: 'hlp_8',
    title: 'Add/Remove Enumerators from projects',
    desc1: [`<p>
    1. After signing in, click on Projects
</p>
<p>
    2. If you want to Add Enumerators, Click on the button and select the
    Enumerators you want to involve in the project.
</p>
<p>
    3. If you want to remove Enumerators from the Project, click on the
    &lt;remove&gt; icon next to the Enumerator to remove them,
</p>
`].join(''),
    img1: vs
  },
  {
    id: 'hlp_9',
    title: 'To Edit a Survey or Member',
    desc1: [`<p>
    1. If you want to Edit Survey, Click on a survey, then click on Edit Survey
</p>
<p>
    2. The modify the details you want to change, including rearranging
    question order
</p>
<p>
    3. When you are done, click on Save changes to finish
</p>
<p>
    4. If you are editing a Member, Click on a Members, then click on their
    name
</p>
<p>
    5. Modify their information including their password, then click Save.
</p>
`].join(''),
  },
  {
    id: 'hlp_10',
    title: 'Sebsib Collect App Basics',
    desc1: [`<p>
    1. When opening the app for the first time you will see a screen to enter
    credentials
</p>
<p>
    2. Enter Enumerator or Owner email, password and Organization ID (found in
    the settings screen on the web app, or bottom left of the Dashboard)
</p>
<p>
    3. Once signed in you can see, four options, Fill, Send, Download and
    Update forms.
</p>
<p>
    4. First tap on Download forms to obtain/download the created survey/form
    the server
</p>
<p>
    5. Second tap on Fill forms and select the form you want fill/capture
    responses on
</p>
<p>
    6. Third tap on Send forms to send the selected responses to the server
</p>
<p>
    7. If there was a change in the survey, you can tap on Update form to get
    the latest form
</p>
`].join(''),
  },
  {
    id: 'hlp_13',
    title: 'Sebsib Shelf Integration',
    desc1: [`<p>Sebsib Shelf is a service that helps you retrieve data from Sebsib programmatically. To integrate it with you system here is the request and response parameters.</p>
    <p>Authentication type is Basic. Use your email as username, and your password.</p>
    <table>
    <tbody>
    <tr>
    <td>
    <p>METHOD</p>
    </td>
    <td>
    <p>Request</p>
    </td>
    <td>
    <p>Response</p>
    </td>
    </tr>
    <tr>
    <td>
    <p><b>GET</b></p>
    <p>Get all the responses from the survey</p>
    </td>
    <td>
    <p>https://138.68.186.119.nip.io/shelf/&lt;Organization Id&gt;/&lt;SurveyId&gt;</p>
    </td>
    <td>
    <p>Array of Arrays</p>
    </td>
    </tr>
    <tr>
    <td>
    <p><b>GET</b></p>
    <p>Get responses from the specified day</p>
    </td>
    <td>
    <p>https://138.68.186.119.nip.io/shelf/&lt;Organization Id&gt;/&lt;SurveyId&gt;?at=MM-DD-YYYY</p>
    </td>
    <td>
    <p>Array of Arrays</p>
    </td>
    </tr>
    <tr>
    <td>
    <p><b>GET</b></p>
    <p>Get responses from the specified day and afterwards</p>
    </td>
    <td>
    <p>https://138.68.186.119.nip.io/shelf/&lt;Organization Id&gt;/&lt;SurveyId&gt;?from=MM-DD-YYYY</p>
    </td>
    <td>
    <p>Array of Arrays</p>
    </td>
    </tr>
    <tr>
    <td>
    <p><b>GET</b></p>
    <p>Get responses in between the dates</p>
    </td>
    <td>
    <p>https://138.68.186.119.nip.io/shelf/&lt;Organization Id&gt;/&lt;SurveyId&gt;?from=MM-DD-YYYY&amp;to=MM-DD-YYYY</p>
    </td>
    <td>
    <p>Array of Arrays</p>
    </td>
    </tr>
    <tr>
    <td>
    <p><b>GET</b></p>
    <p>Get all the responses from the survey in Excel</p>
    </td>
    <td>
    <p>https://138.68.186.119.nip.io/shelf/xl/&lt;Organization Id&gt;/&lt;SurveyId&gt;</p>
    </td>
    <td>
    <p>Excel file</p>
    </td>
    </tr>
    </tbody>
    </table>`].join(''),
  },
  {
    id: "help_14",
    title: "Call Support",
    desc1: "You can call us at, +251920642556 or +251920747084 or +251919486919. We can guide you through the steps or fix it if there is an issue"
  }
]

export default helpData ;