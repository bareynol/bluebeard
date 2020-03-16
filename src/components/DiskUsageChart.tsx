import React from 'react';
import { VictoryPie, VictoryChart, VictoryContainer, VictoryTheme, VictoryLabel, } from "victory-native";
import { StyleSheet, View } from 'react-native';
import Svg from 'react-native-svg';

// CONSTANTS
// width / height of the svg drawing area
const VIEW_WIDTH = 150
const VIEW_HEIGHT = 150
const ASPECT_RATIO = VIEW_WIDTH / VIEW_HEIGHT;

// how large of an empty center circle to leave
const INNER_RADIUS = 0.36;

// size of the "current level" indicator as a percentage pie chart
// should be a low number
const INDICATOR_SIZE = 1;

export default function DiskUsageChart({percentage, width, valueLabel, label, fontSize}) {
  return (
    <View style={{width: width,}}>
      <View style={styles.svgContainer}>
        <Svg width="100%" height="100%" viewBox={`-5 -5 ${VIEW_WIDTH + 10} ${VIEW_HEIGHT + 10}`}>
          <VictoryPie
            data={[
              { x: 1, y: percentage - INDICATOR_SIZE / 2},      // draws the "Filled" portion
              { x: 2, y: INDICATOR_SIZE},                       // draws the "current" indicator
              { x: 3, y: 100-percentage - INDICATOR_SIZE / 2}   // draws the "empty" portion
            ]}
            standalone={false}
            origin={{y: VIEW_WIDTH / 2}}
            width={VIEW_WIDTH}
            padding={0}
            labels={() => ""}
            innerRadius={VIEW_WIDTH * INNER_RADIUS}
            style={{
              data: {
                fill: ({index, datum}) => {
                  switch(index) {
                    case 0:
                      if (datum.y > 75) {
                        return "red";
                      } else if (datum.y > 50) {
                        return "orange";
                      } else {
                        return "green"
                      }
                    case 1:
                      return "white"
                    case 2:
                    default:
                      return "black"
                  }
                },
                stroke: 'white',
                strokeWidth: 3,
              },
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{fill: "white", fontSize: VIEW_HEIGHT * 0.2}}
            x={VIEW_WIDTH / 2} y={VIEW_HEIGHT / 2}
            text={valueLabel}
          />
          {/* <VictoryLabel
            textAnchor="middle"
            style={{fill: "white", fontSize: VIEW_WIDTH * 0.07}}
            x={VIEW_WIDTH / 2} y={VIEW_HEIGHT * 0.9}
            text={props.label}
          /> */}
        </Svg>
      </View>
      {/* <AutoSizeLabel text={label} fontSize={fontSize} numberOfLines={1} style={{textAlign: 'center', color: 'white'}} /> */}
    </View> 
  )
};

const styles = StyleSheet.create({
  svgContainer: {
    aspectRatio: ASPECT_RATIO,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  }
});
