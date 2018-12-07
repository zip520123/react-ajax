import React, { Component } from 'react';
import $ from 'jquery'
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    // {"meetingList":[{"did":"69635","meetingRoorm":"5F會議室","meetingSubject":"107年度既有設施期末審查","meetingHost":"周局長","meetingDate":"2018/12/3","meetingHourBegin":"09:00","meetingHourEnd":"12:00"},{"did":"69493","meetingRoorm":"5F會議室","meetingSubject":"「107年新店溪青潭水質水量保護區個別定點水質採樣及檢測案（含突發事件處理）」期末報告審查會議","meetingHost":"局長","meetingDate":"2018/12/3","meetingHourBegin":"14:00","meetingHourEnd":"16:30"}]}
    
    this.state = {
        meetingList : [],
        error: null
    };
    if (process.env.NODE_ENV !== 'production') {
        this.state.meetingList = [
            {
              "會議日期": "/Date(1543766400000)/",
              "開始時間": "09:00",
              "結束時間": "12:30",
              "會議地點": "5F會議室",
              "會議名稱": "107年度既有設施期末審查",
              "會議主持人": "周局長"
            },
            {
              "會議日期": "/Date(1543766400000)/",
              "開始時間": "14:00",
              "結束時間": "17:00",
              "會議地點": "5F會議室",
              "會議名稱": "「107年新店溪青潭水質水量保護區個別定點水質採樣及檢測案（含突發事件處理）」期末報告審查會議",
              "會議主持人": "局長"
            }
          ]
    }
    
        
  }
  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
        this.getMeeting()
    }
  }
  getMeeting(){
    fetch("./../admin/meeting")
      .then(res => {
       return res.json()
      })
      .then(
        (result) => {
          this.setState({
            meetingList: result
          });
        },
        (error) => {
          this.setState({
            error
          })
        }
      )
  }

  render() {
         this.state.meetingList.map(item => {
            console.log(item)
        })
        var dateList = this.state.meetingList.map(item => {
            return new Date(parseInt(item.會議日期.substr(6)))
            // <p>日期：
            //         {
            //             dateList[index].getFullYear() + '/' + (dateList[index].getMonth() + 1) + '/' +
            //             dateList[index].getDate()
                        
            //         }</p>
        })
        return (<>
            { this.state.error ?
                <p>Error: {this.state.error.message}</p>
                :
                this.state.meetingList.map((item,index) => (<>
                  <p>{item.開始時間}~{item.結束時間}</p>
                  <p>{item.會議地點} </p>
                  <p>{item.會議名稱}</p>
                  <hr/>
                  </>
              ))
              
            }
            </>
        );
        
    }
  
}

export default App;
