import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

const pdata = [
    {
        CompanyName: 'Apple',
        employee: 150,
        fees: 120
    },
    {
        CompanyName: 'Google',
        employee: 121,
        fees: 12
    },
    {
        CompanyName: 'Amazon',
        employee: 1623,
        fees: 10
    },
    {
        CompanyName: 'Microsoft',
        employee: 580,
        fees: 5
    },
    {
        CompanyName: 'Tencent',
        employee: 783,
        fees: 4
    },
    {
        CompanyName: 'Tesla',
        employee: 237,
        fees: 8
    },
];
    
const itemsFromBackend = [
    { id: uuid(), content: "First chart", class:"linechart",  icon: "https://cdn-icons.flaticon.com/png/512/2723/premium/2723575.png?token=exp=1644921505~hmac=662fc9a50ee34a60bf60a9e00331e189" },
    { id: uuid(), content: "Second chart",class:"barchart", icon: "https://cdn-icons-png.flaticon.com/512/3314/3314386.png"},
    { id: uuid(), content: "Third chart",class:"wheelchart", icon: "https://cdn-icons.flaticon.com/png/512/4370/premium/4370650.png?token=exp=1644921644~hmac=488c90d2f4dcef2a76a1b2f9f0f50ba0" },
    { id: uuid(), content: "Fourth chart",class:"piechart", icon: "https://cdn-icons-png.flaticon.com/512/2698/2698195.png" },
    { id: uuid(), content: "Fifth chart",class:"verticalLinechart", icon: "https://cdn-icons.flaticon.com/png/512/4366/premium/4366091.png?token=exp=1644921725~hmac=81980f37755244c92dab6b163a89bb47" },
    { id: uuid(), content: "Fifth chart",class:"verticalLinechart", icon: "https://cdn-icons.flaticon.com/png/512/4366/premium/4366091.png?token=exp=1644921725~hmac=81980f37755244c92dab6b163a89bb47" },
    { id: uuid(), content: "Fifth chart",class:"verticalLinechart", icon: "https://cdn-icons.flaticon.com/png/512/4366/premium/4366091.png?token=exp=1644921725~hmac=81980f37755244c92dab6b163a89bb47" },
    { id: uuid(), content: "Fifth chart",class:"verticalLinechart", icon: "https://cdn-icons.flaticon.com/png/512/4366/premium/4366091.png?token=exp=1644921725~hmac=81980f37755244c92dab6b163a89bb47" }
  ];
  
  const columnsFromBackend = {
    [uuid()]: {
      name: "",
      class: "uk-width-expand@m",
      InnerClass: "",
      items: []
    },
    [uuid()]: {
      name: "Visualization",
      class: "uk-width-1-4",
      InnerClass: "uk-grid",
      items: itemsFromBackend
    }
  };
  
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };


function Home(){
    const [columns, setColumns] = useState(columnsFromBackend);
    var today = new Date();
    var ampm = today.getHours() >= 12 ? 'PM' : 'AM';
    var date =  (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + " "+ today.getHours() + ":"+ today.getMinutes()+" "+ampm;
    return (
       
        <div className="Home">
            <div className="uk-container uk-margin-medium-top">
                <div className="uk-text-center uk-grid" uk-grid>
                    <h3 className="contentTitle">New DashBoard (1) {date}</h3>
                </div>
            </div>
            <div className="uk-container uk-margin-medium-top">
            <div className="uk-text-center uk-grid" uk-grid>
                
                    <div className="uk-width-1-1@l filter-nav">
                    <button className="uk-button uk-button-yellow uk-margin-medium-right">Filter</button>
                        <div className="uk-inline uk-margin-medium-right">
                            <input className="uk-input" type="text" placeholder="Columns"/>
                            <span className="uk-form-icon" uk-icon="icon: search"></span>
                        </div>
                        <div className="uk-inline uk-margin-small-right">
                            <input className="uk-input" type="text" placeholder="Rows"/>
                            
                        </div>
                        <button className="uk-button uk-button-orange uk-margin-medium-right button-expand" uk-icon="icon: expand"><span className="uk-form-icon" ></span></button>
                        <button className="uk-button uk-button-orange uk-margin-medium-right">Export</button>
                    </div>
                </div>
            </div>
        <div className="uk-container uk-margin-medium-top">
            <div className="uk-text-center uk-grid" uk-grid>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className={column.class}
              
              key={columnId}
            >
              
              <div style={{ margin: 8 }}>
                  
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div className="uk-grid uk-card"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "white",
                          padding: 4,
                          minHeight: 500
                        }}
                      >
                <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={pdata} margin={{ right: 100 }}>
                    <CartesianGrid />
                    <XAxis dataKey="CompanyName" 
                        interval={'preserveStartEnd'} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey="employee"
                        stroke="black" activeDot={{ r: 8 }} />
                    <Line dataKey="fees"
                        stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
                          <h4>{column.name}</h4>
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                    <div className="uk-width-1-2@m">
                                        <div className="uk-card uk-card-default uk-card-body"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                
                                            >
                                                <img src={item.icon} />
                                            </div>
                                    </div>
                                  
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
        </div>
      </div>
    </div>
    );
}

export default Home;