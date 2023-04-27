import { Row } from "react-bootstrap";
import { Question, Response } from "./View_Survey"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import { useState } from "react";
import Checkbox from "../../components/Sb_Checkbox_V2/Sb_Checkbox_V2";
import Sb_Text from "../../components/Sb_Text/Sb_Text";

interface Props {
  question: Question
  responses: Response[]
}

export function VisualizeNumber (props: Props) {
  var LABELS:string[] = []
  var DATA:number[] = []
  var DATA_AVG:number[] = []
  var DATA_RNG:number[] = []
  var DATA_MD:number[] = []
  var RAW_RES:number[] = []
  var FOR_TIME_SERIES:{time: Date, value: number}[] = []
  const backgroundColor = [
    'rgb(211, 63, 73)',
    'rgb(63, 48, 71)', 
    'rgb(134, 187, 216)',
    'rgb(249, 200, 14)', 
    'rgb(242, 100, 25)',
    'rgb(4, 114, 77)', 
    'rgb(21, 30, 63)'
  ]
  const [isTimeSeries, setDispMode] = useState<boolean>(false);

  function ValueFrequency (items:string[]) {
    const result:any = {};

    const itemFreq = items.reduce((acc:any, curr:any) => {
      acc[curr] = (acc[curr] ?? 0) + 1;
      if (acc[curr] >= 3) {
        result[curr] = acc[curr];
      }
      return acc;
    }, {});

    return itemFreq
  }

  function getAverage(arr:number[]) {
    var sum = 0;
    for(var i = 0; i < arr.length; i++) {
      sum += Number(arr[i]);
    }
  
    return sum / arr.length;
  }

  for (let index = 0; index < props.responses.length; index++) {
    const resp = props.responses[index];
    for (let ANS_INDX = 0; ANS_INDX < resp.answers.length; ANS_INDX++) {
      const answer = resp.answers[ANS_INDX];
      if (answer.questionId === props.question?._id && answer.answer != "" && answer.answer)
        RAW_RES.push(answer.answer as number)
    }
  }

  for (let index = 0; index < props.responses.length; index++) {
    const resp = props.responses[index];
    for (let ANS_INDX = 0; ANS_INDX < resp.answers.length; ANS_INDX++) {
      const answer = resp.answers[ANS_INDX];
      if (answer.questionId === props.question?._id && answer.answer != "" && answer.answer)
        FOR_TIME_SERIES.push({
          time: resp.sentDate,
          value: answer.answer as number
        })
    }
  }

  var mode:number = 0
  // Get frequency
  const ValFreqObj = ValueFrequency(RAW_RES.sort(((a,b) => a - b)).map(r => r.toString()));
  for (const [key, value] of Object.entries(ValFreqObj)) {
    LABELS.push(key);
    DATA.push(value as number);
    (value as number) >= mode ? mode = value as number : null;
  }
  // Get Mode
  DATA_MD.push(mode)

  // Get Average/Mean
  RAW_RES.length > 0 ? DATA_AVG.push(getAverage(RAW_RES)) : null
  // Get Range
  RAW_RES.length > 0 ? DATA_RNG.push(RAW_RES.sort((a,b) => b - a)[0] - RAW_RES.sort((a,b) => b - a)[RAW_RES.length - 1]) : null

  ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement );
  
  const options = { plugins: { legend: { position: "top" as const } } };

  const data = {
    labels: LABELS,
    datasets: [
      {
        label: "Count",
        data: DATA,
        backgroundColor: backgroundColor[2],
      }
    ],
  };

  const time_series_data = {
    labels: FOR_TIME_SERIES
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    .map<string>((FTS) => new Date(FTS.time)
    .toISOString().split('T')[0]
    .split('-').map((item) => item.length == 4 ? item.substring(2) : item)
    .reverse()
    .join("/")
    ),
    datasets: [
      {
        label: "Value",
        data: FOR_TIME_SERIES.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()).map<number>((FTS) => FTS.value),
        backgroundColor: backgroundColor[3],
        borderColor: backgroundColor[3]
      }
    ],
  };

  const data_meta = {
    labels: [""],
    datasets: [
      {
        label: "Average",
        data: DATA_AVG,
        backgroundColor: backgroundColor[3],
      },
      {
        label: "Range",
        data: DATA_RNG,
        backgroundColor: backgroundColor[4],
      },
      {
        label: "Mode",
        data: DATA_MD,
        backgroundColor: backgroundColor[5],
      },
    ],
  };

  return (
    <div>
      <p className="d-flex align-items-center"><Checkbox checked={isTimeSeries} onCheckAction={() => setDispMode(!isTimeSeries)}/><Sb_Text font={16}>Time series</Sb_Text></p>
      { isTimeSeries  && 
      <>
        <Row>
          <div>
            <p className="visual-question">{props.question?.questionText}</p>
            <Line options={options} data={time_series_data} />
          </div>
        </Row>
      </>}
      { !isTimeSeries && 
      <>
        <Row>
          <div>
            <p className="visual-question">{props.question?.questionText}</p>
            <Bar options={options} data={data} />
          </div>
        </Row>
        <Row>
            <Bar options={options} data={data_meta} />
        </Row>
      </>}
    </div>
  )
}