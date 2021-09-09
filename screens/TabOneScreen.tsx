import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Scanner from "../components/Scanner";
import { RootTabScreenProps } from "../types";

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
	const [data, setData] = useState(null);
	return (
		<View style={styles.container}>
			<Scanner returnData='' />
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
});
