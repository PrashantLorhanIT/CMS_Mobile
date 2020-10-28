import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { FONT_SIZE_12, FONT_WEIGHT_BOLD, FONT_SIZE_16, FONT_SIZE_14, FONT_SIZE_8, FONT_FAMILY_REGULAR, FONT_WEIGHT_REGULAR, FONT_FAMILY_PT_REGULAR } from '../../utils/styles/typography'
export default class RadioButton extends Component {
	constructor(props) {
		super(props);
		console.log('Radio button screen props');
		console.log(props);
	}
	state = {
		value: null,
	};

	render() {
		const { options } = this.props;
		const { value } = this.props;

		return (
			<View style={styles.viewContainer} >
				{options.map(item => {
					return (
						<View key={item.key} style={styles.buttonContainer}>

							<TouchableOpacity
								style={styles.circle}
								onPress={() => {
									this.props.onSelectChange(item.key);
									  //this.setState({ value:item.key })
								}}
							>
								{value === item.key && <View style={styles.checkedCircle} />}
							</TouchableOpacity>
							<Text style={styles.radiobuttonText}>{item.text}</Text>
						</View>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		//alignContent: 'flex-start',
		marginLeft:0
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		alignContent:'space-around'

	},
	circle: {
		height: 20,
		width: 20,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#aa182c',
		alignItems: 'center',
		justifyContent: 'center',
        
	},
	checkedCircle: {
		width: 12,
		height: 13,
		borderRadius: 7,
		backgroundColor: '#aa182c',
        borderColor: '#aa182c',
        marginRight:0
	},
	radiobuttonText: {
		paddingStart: 10,
		fontSize: FONT_SIZE_14,
		fontFamily: FONT_FAMILY_PT_REGULAR,
		justifyContent: 'flex-start',
        alignSelf: 'baseline',
        alignContent:'flex-start'
	},
});