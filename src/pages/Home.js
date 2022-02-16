import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LineChart_R from "../components/Charts/LineChart";
import PieChart_R from "../components/Charts/PieChart";
import BarChart_R from "../components/Charts/BarChart";
import RadarChart_R from "../components/Charts/RadarChart";
import AreaChart_R from "../components/Charts/AreaChart";
import { v4 as uuid } from "uuid";

const itemsFromBackend = [
  {
    id: uuid(),
    content: "First chart",
    class: "linechart",
    icon: "/linechart.png",
  },
  {
    id: uuid(),
    content: "Second chart",
    class: "barchart",
    icon: "/barchart.png",
  },
  {
    id: uuid(),
    content: "Third chart",
    class: "areachart",
    icon: "/areachart.png",
  },
  {
    id: uuid(),
    content: "Fourth chart",
    class: "piechart",
    icon: "/piechart.png",
  },
  {
    id: uuid(),
    content: "Fifth chart",
    class: "radarchart",
    icon: "/radarchart.png",
  },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "",
    class: "uk-width-expand",
    InnerClass: "",
    items: [],
  },
  [uuid()]: {
    name: "Visualization",
    class: "uk-width-1-4",
    InnerClass: "uk-grid",
    items: itemsFromBackend,
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [];

    destItems.push(...destColumn.items);

    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,

      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
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
        items: copiedItems,
      },
    });
  }
};

function Home() {
  const [columns, setColumns] = useState(columnsFromBackend);
  var today = new Date();
  var ampm = today.getHours() >= 12 ? "PM" : "AM";
  var date =
    today.getMonth() +
    1 +
    "/" +
    today.getDate() +
    "/" +
    today.getFullYear() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    " " +
    ampm;
  return (
    <div className="Home">
      <div className="uk-container uk-margin-medium-top">
        <div className="uk-text-center uk-grid">
          <h3 className="contentTitle">New DashBoard (1) {date}</h3>
        </div>
      </div>
      <div className="uk-container uk-margin-medium-top">
        <div className="uk-text-center uk-grid">
          <div className="uk-width-1-1@l filter-nav">
            <button className="uk-button uk-button-yellow uk-margin-medium-right">
              Filter
            </button>
            <div className="uk-inline uk-margin-medium-right">
              <input className="uk-input" type="text" placeholder="Columns" />
              <span className="uk-form-icon" uk-icon="icon: search"></span>
            </div>
            <div className="uk-inline uk-margin-small-right">
              <input className="uk-input" type="text" placeholder="Rows" />
            </div>
            <button
              className="uk-button uk-button-orange uk-margin-medium-right button-expand"
              uk-icon="icon: expand"
            >
              <span className="uk-form-icon"></span>
            </button>
            <button className="uk-button uk-button-orange uk-margin-medium-right">
              Export
            </button>
          </div>
        </div>
      </div>
      <div className="uk-container uk-margin-medium-top">
        <div className="uk-text-center uk-grid">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div className={column.class} key={columnId}>
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            className="uk-grid uk-card"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "white",
                              padding: 4,
                              minHeight: 500,
                            }}
                          >
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
                                      <div className="uk-width-1-2">
                                        <div
                                          className="uk-card uk-card-default uk-card-body"
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <img src={item.icon} />
                                          <>
                                            {item.class == "linechart" && (
                                              <LineChart_R />
                                            )}

                                            {item.class == "barchart" && (
                                              <BarChart_R />
                                            )}

                                            {item.class == "piechart" && (
                                              <PieChart_R />
                                            )}

                                            {item.class == "radarchart" && (
                                              <RadarChart_R />
                                            )}

                                            {item.class == "areachart" && (
                                              <AreaChart_R />
                                            )}
                                          </>
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
