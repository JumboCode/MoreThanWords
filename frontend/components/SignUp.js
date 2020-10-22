import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';

class SignUpPage extends React.Component {

	/* 
	 * State variables initalized:
	 * 	  - firstname: tracks user input firstname
	 * 	  - lastname: tracks user input lastname
	 * 	  - email: tracks user input email
	 * 	  - password: tracks user input password
	 *	  - confirmpassword: tracks user input confirm password
	 * 	  - verified: tracks whether user is able to use the MTW app 
	 *	  -           after we check (default as false)
	 * 	  - accountChecked: tracks whether users inputted information has 
	 *					    been checked against salesforce
	 *	  - showVerifiedModal: tracks whether we should show the modal saying
	 *                         they are unauthorized to use this app.
	 */
	constructor(props) {
		super(props)
		this.state = {
			firstname: "",
			lastname: "",
			email: "",
			password: "",
			confirmpassword: "",
			verified: false,
			accountChecked: false,
			showVerifiedModal: false,
			checkedAgreement: false

		}
	}
	
	/* verify Identity
	 * Parameters: none
	 * Returns: nothing
	 * Purpose: Use the state variable and get a response on whether the 
	 *          user has been verified to use the app
	 */
	async verifyIdentity() {
		try {
			// consider making this a POST request, considering we are passing sensitive user data like password
			var verify = await fetch(`http://192.168.68.117:5000/verifySignUp?firstname=${this.state.firstname}&lastname=${this.state.lastname}&email=${this.state.email}`)
				.then(response => response.json())
  				.then(data => {
  					console.log(data)
  					if (!data.verified) {
  						this.setState({verified: false, showVerifiedModal: true})
  					}
  					this.setState({accountChecked: true})
  				});
		} catch(e) {
			console.log("SignUpError: ", e)
		}
	}

	/* updateFirstName
	 * Parameters: firstname to update, new value to put in
	 * Returns: nothing
	 * Purpose: To update firstname with the most recent input data from the user
	 */
	updateFirstName = (text) => {
		this.setState({firstname: text}, () => {
			console.log("the firstname is... " + this.state.firstname);

		})
	}

	/* updateLastName
	 * Parameters: last name to update, new value to put in
	 * Returns: nothing
	 * Purpose: To update lastname with the most recent input data from the user
	 */
	updateLastName = (text) => {
		this.setState({lastname: text}, () => {
			console.log("the new input is... " + this.state.lastname);
		})
	}

	/* updateEmail
	 * Parameters: email to update, new value to put in
	 * Returns: nothing
	 * Purpose: To update email with the most recent input data from the user
	 */
	updateEmail = (text) => {
		this.setState({email: text}, () => {
			console.log("the new input is... " + this.state.email);
		})
	}

	/* updatePassword
	 * Parameters: password to update, new value to put in
	 * Returns: nothing
	 * Purpose: To update password with the most recent input data from the user
	 */
	updatePassword = (text) => {
		this.setState({password: text}, () => {
			console.log("the new input is... " + this.state.password);
		})
	}

	/* updateConfirmPassword
	 * Parameters: confirmpassword to update, new value to put in
	 * Returns: nothing
	 * Purpose: To update confirmed password with the most recent input data from the user
	 */
	updateConfirmPassword = (text) => {
		this.setState({confirmpassword: text}, () => {
			console.log("the new input is... " + this.state.confirmpassword);
		})
	}

	/* toggleModal
	 * Parameters: none
	 * Returns: nothing
	 * Purpose: To close the modal (mostly close)
	 */
	toggleModal() {
		this.setState({ showVerifiedModal: !this.state.showVerifiedModal})
	}

	 /* toggleAgreement
	 * Parameters: none
	 * Returns: nothing
	 * Purpose: To close the modal (mostly close)
	 */
	toggleAgreement() {
		this.setState({ checkedAgreement: !this.state.checkedAgreement})
	}


	/* render
	 * Paramsters: none
	 * Returns: nothing
	 * Purpose: renders page, which takes user SignUp info and checks it against
	 *          SF databse
	 */
	render() {
		return (
			<View>
			<Text style={styles.signupheader}> Sign Up Page </Text>
				<TextInput
					  style={styles.signupinput}
				      onChangeText={text => this.updateFirstName(text)}
				      value={this.state.firstname}
				      placeholder="First Name"
				/>
				<TextInput
					  style={styles.signupinput}
				      onChangeText={text => this.updateLastName(text)}
				      value={this.state.lastname}
				      placeholder="Last Name"
				/>
				<TextInput
					  style={styles.signupinput}
				      onChangeText={text => this.updateEmail(text)}
				      value={this.state.email}
				      placeholder="Email"
				/>
				<TextInput
					  style={styles.signupinput}
				      secureTextEntry={true}
				      onChangeText={text => this.updatePassword(text)}
				      value={this.state.password}
				      placeholder="Password"
				/>
				<TextInput
				      style={styles.signupinput}
				      secureTextEntry={true}
				      onChangeText={text => this.updateConfirmPassword(text)}
				      value={this.state.confirmpassword}
				      placeholder="Confirm Password"
				/>
				{
					// if pressed and agreed to display in green
					this.state.checkedAgreement &&
						<TouchableOpacity onPress={this.toggleAgreement.bind(this)}>
							<Icon name="ios-checkmark-circle-outline" size={45} color="#90ee90" style = {styles.checkicon} />
					    	<Text style = {styles.checkedAgreement}> I accept the Terms of Use & Privacy Policy </Text>
						</TouchableOpacity>
				}

				{
					// if not pressed/agreed to display in grey
					!this.state.checkedAgreement && 
					<TouchableOpacity onPress={this.toggleAgreement.bind(this)}>
				    	<Icon name="ios-checkmark-circle-outline" size={45} color="#CDCDCD" style = {styles.checkicon} />
				     	<Text style = {styles.uncheckedAgreement}> I accept the Terms of Use & Privacy Policy </Text>
					</TouchableOpacity>
				}
				<TouchableOpacity
				        style={styles.signupsubmit}
				        onPress={this.verifyIdentity.bind(this)}
				>
				     <Text style = {styles.submittext}> Submit </Text>
				</TouchableOpacity>
			{
				!this.state.verified && this.state.accountChecked &&
				/* should be converted into a popup/modal that says "you haven't been verified based on SF" */
				Alert.alert(
				  'You are not authorized to use this app. Please check your credentials and contact MTW if you think this is an issue.',
				  '',
				  [
				    { text: 'OK', onPress: () => console.log('OK Pressed') }
				  ],
				  { cancelable: false }
				)
			}
			{
				this.state.verified && this.state.accountChecked &&
			    /* will be converted into a redirect to the home page */
				alert("good to go, lets set up an account")
			}
			</View>

		)
	}
}
const styles = StyleSheet.create({
  signupinput: {
    padding: 25,
    margin: 20,
    backgroundColor: "#eaeaea",

  },
  signupsubmit: {
  	backgroundColor: 'red',
  	color: 'white',
  	alignItems: "center",
  	paddingLeft: 10,
  	paddingRight: 10,
  	paddingTop: 20,
  	paddingBottom: 20,
  	shadowColor: "#000",
  	shadowOffset: {
  		width: 0,
  		height: 2,
  	},
  	shadowOpacity: 0.25,
  	shadowRadius: 3.84,
  	elevation: 5,
  }, 
  signupheader: {
  	fontSize: 24,
  	alignItems: "flex-start",
  	fontWeight: "bold",
  },
  submittext: {
  	color: 'white',
  	fontWeight: "bold"
  },
  checkedAgreement: {
  	color: 'black',
  	paddingBottom: 10
  },
  uncheckedAgreement: {
  	color: '#CDCDCD',
  	paddingBottom: 10
  },
  agreement: {
  	flex: 1,
  	flexDirection: "row"
  },
  checkicon: {
  	textAlign: "center"
  }
});
export default SignUpPage;