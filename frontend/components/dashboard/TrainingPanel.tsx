import { VStack, Box, HStack, Heading, Text } from "@chakra-ui/react";
import { TrainingVolumeGraph } from "./TrainingVolumeGraph";
import { AverageVelocityGraph } from "./AverageVelocityGraph";
import moment from "moment";
import { fetchSummaryData } from "../../lib/client";
import _ from "lodash";
import { Workout } from "../../models";
import { useState } from "react";
import useSWR from "swr";
import { RadioButtons } from "./customRadio";
import React from "react";

// Helper component to simplify the main component structure
const TrainingContent = ({
  periodOptions,
  handleDateChange,
  trainingVolumeData,
  velocityData
}: {
  periodOptions: string[]
  handleDateChange: (period: any) => void
  trainingVolumeData: any
  velocityData: any
}) => {
  // @ts-ignore: Complex union type error
  return (
    <>
      <Heading size="md">Training Data from Strava</Heading>
      <HStack width={"100%"} justifyContent={"flex-end"}>
        <RadioButtons
          options={periodOptions}
          defaultValue={"1w"}
          onChange={handleDateChange}
          selectedColor={"rgb(74, 144, 226)"}
        />
      </HStack>
      
      <Box width={"100%"} height={"250px"}>
        <Text fontWeight={600} mb={2}>Weekly Training Volume (kilometers)</Text>
        <TrainingVolumeGraph data={trainingVolumeData} />
      </Box>
      
      <Box width={"100%"} height={"250px"}>
        <Text fontWeight={600} mb={2}>Weekly Average Velocity (km/h)</Text>
        <AverageVelocityGraph data={velocityData} />
      </Box>
    </>
  );
};

export const TrainingPanel = ({ userId }: { userId: any }) => {
  const [startDate, setStartDate] = useState(
    moment().subtract(7, "days").toISOString()
  );
  const [endDate, setEndDate] = useState(moment().toISOString());

  const { data: workouts = [], error: errorWorkouts } = useSWR(
    userId ? ["workouts", userId, startDate, endDate, "workouts"] : null,
    fetchSummaryData
  );

  const handleDateChange = (period: "1w" | "1m" | "1y" | "2y" | "5y") => {
    switch (period) {
      case "5y":
        setStartDate(moment().subtract(5, "years").toISOString());
        return;
      case "2y":
        setStartDate(moment().subtract(2, "years").toISOString());
        return;
      case "1y":
        setStartDate(moment().subtract(1, "year").toISOString());
        return;
      case "1m":
        setStartDate(moment().subtract(30, "days").toISOString());
        return;
      case "1w":
        setStartDate(moment().subtract(7, "days").toISOString());
        return;
      default:
        return;
    }
  };

  // Calculate weekly training volume data in kilometers
  const getWeeklyTrainingVolume = (workouts: Workout[]) => {
    const weeks: { [key: string]: number } = {};
    
    workouts.forEach(workout => {
      const weekStart = moment(workout.time_start).startOf('week').format('YYYY-MM-DD');
      
      if (!weeks[weekStart]) {
        weeks[weekStart] = 0;
      }
      
      // Add distance in kilometers
      weeks[weekStart] += workout.distance / 1000; // Convert meters to kilometers
    });
    
    return Object.entries(weeks).map(([week, distance]) => ({
      week,
      distance: parseFloat(distance.toFixed(2))
    }));
  };

  // Calculate weekly average velocity
  const getWeeklyAverageVelocity = (workouts: Workout[]) => {
    const weeks: { [key: string]: { totalDistance: number; totalDuration: number; } } = {};
    
    workouts.forEach(workout => {
      const weekStart = moment(workout.time_start).startOf('week').format('YYYY-MM-DD');
      
      if (!weeks[weekStart]) {
        weeks[weekStart] = { totalDistance: 0, totalDuration: 0 };
      }
      
      // Calculate duration in hours
      const startTime = moment(workout.time_start);
      const endTime = moment(workout.time_end);
      const durationHours = endTime.diff(startTime, 'hours', true);
      
      weeks[weekStart].totalDistance += workout.distance / 1000; // Convert to km
      weeks[weekStart].totalDuration += durationHours;
    });
    
    return Object.entries(weeks).map(([week, data]) => ({
      week,
      velocity: data.totalDuration > 0 ? parseFloat((data.totalDistance / data.totalDuration).toFixed(2)) : 0
    }));
  };

  const trainingVolumeData = getWeeklyTrainingVolume(workouts);
  const velocityData = getWeeklyAverageVelocity(workouts);
  const periodOptions = ["1w", "1m", "1y", "2y", "5y"];

  // @ts-ignore: Complex union type error
  return (
    <VStack
      p="6"
      h="xl"
      bg="white"
      shadow="base"
      rounded="lg"
      height="100%"
      my={10}
      alignItems={"flex-start"}
      spacing={4}
    >
      <TrainingContent 
        periodOptions={periodOptions}
        handleDateChange={handleDateChange}
        trainingVolumeData={trainingVolumeData}
        velocityData={velocityData}
      />
    </VStack>
  );
}; 