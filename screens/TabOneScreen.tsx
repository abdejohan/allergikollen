import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import useAxios from "axios-hooks";
import * as Location from "expo-location";

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
	const [location, setLocation] = useState<any>(null);
	const [errorMsg, setErrorMsg] = useState<string>();

	const API_KEY = "3dca5b4b-f451-4c5d-8d82-65fa25e77ebc";
	const STATE_NAME = "stockholm";
	const [airDdata, setAirData] = useState();
	const COUNTRY_NAME = "sweden";
	const [{ data: airData, loading, error }, getAirData] = useAxios(
		{
			url: `http://api.airvisual.com/v2/nearest_city?lat=${location?.coords?.latitude}}&lon=${location?.coords?.longitude}&key=${API_KEY}`,
			headers: {},
		},
		{ manual: true }
	);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Lowest,
			});
			setLocation(location);
		})();
	}, []);

	useEffect(() => {
		getAirData();
	}, []);

	useEffect(() => {
		setAirData(airData);
		console.log(airData);
	}, [airData]);

	return (
		<View style={styles.container}>
			<Text>{airData?.data[9]?.city}</Text>
			<Text style={styles.paragraph}>{location?.coords?.longitude}</Text>
			<Text style={styles.paragraph}>{location?.coords?.latitude}</Text>
		</View>
	);
};

export default TabOneScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	paragraph: {
		fontSize: 18,
		textAlign: "center",
	},
});
