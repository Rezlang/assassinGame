
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loginScrn: {
    flex: 1,
    backgroundColor: '#282c34',
    color: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homePageScrn: {
    flex: 1,
    backgroundColor: '#282c34',
    color: 'aliceblue',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    top: 20,
    height: 30,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  subTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    padding: 30,
  },
  loginTextBox: {
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  loginBtn: {
    flex: 0.45,
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 10,
    cursor: 'pointer',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loginGoogle: {
    backgroundColor: '#4285f4',
    borderColor: '#4285f4',
  },
  loginBtnMargin: {
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 10,
    left: 10,
  },

  logoutBtnTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export const homepageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoutText: {
    fontSize: 16,
    color: '#007BFF',
  },
  userText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
    textAlign: 'right',
    maxWidth: '50%',
  },
  targetText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    width: '75%',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
  },
});