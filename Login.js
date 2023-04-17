import React, { useState, useEffect, useReducer } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'

import { actionCreators, initialState, reducer } from './reducer'
import { api } from './api'
import { data } from './data'
import * as items from './login_data'


function Login({ navigation, route }){ 
const url = (api.login ?? "login/") + (route?.params?.id ?? '')
const [state, dispatch] = useReducer(reducer, initialState)

const { item, history, loading, error } = state

const [valueEmailAddress, onChangeEmailAddress] = useState('')
const [valuePassword, onChangePassword] = useState('')
const onPressLoginButton = () => {}
const onPressFacebookLoginButton = () => {}
const onPressGoogleLoginButton = () => {}
const onPressCreateAccountButton = () => {}

async function getItem() {
      dispatch(actionCreators.loading())

      try {
        if (url in history){
           dispatch(actionCreators.local(history[url]))
        } else if (url.indexOf('http') > -1){
          const response = await fetch(url)
          const json = await response.json()
          if(json){
            dispatch(actionCreators.success(route.params?.id || !Array.isArray(json) ? json : json[0], url))
          }   
        } else {
          const json = route.params?.id ? data[route.params?.id] : items.item
          dispatch(actionCreators.success(json, url))
        }
      } catch (e) {
        dispatch(actionCreators.failure())
      }
    }

useEffect(() => {
    getItem();
}, []);
  
if (loading) {
    return (
        <View style={styles.center}>
        <ActivityIndicator animating={true} />
        </View>
    )
}

return(
<ScrollView style={styles.login} showsVerticalScrollIndicator={false}>
<View style={{flexDirection: 'row'}}>
<Text style={styles.app_name} numberOfLines={1}>{item.app_name}</Text>
<Text style={styles.login_title} numberOfLines={1}>{item.login_title}</Text>
</View>
<TextInput style={styles.email_address} value={valueEmailAddress} onChangeText={onChangeEmailAddress} placeholder={'Email Address'} />
<TextInput style={styles.password} value={valuePassword} onChangeText={onChangePassword} placeholder={'Password'} />
<View style={{flexDirection: 'row'}}>
<TouchableOpacity  onPress={onPressLoginButton}>
    <View style={styles.login_button}>{'Login Button'}</View>
</TouchableOpacity>
<Text style={styles.or_label} numberOfLines={1}>{item.or_label}</Text>
</View>
<View style={{flexDirection: 'row'}}>
<TouchableOpacity  onPress={onPressFacebookLoginButton}>
    <View style={styles.facebook_login_button}>{'Facebook Login Button'}</View>
</TouchableOpacity>
<TouchableOpacity  onPress={onPressGoogleLoginButton}>
    <View style={styles.google_login_button}>{'Google Login Button'}</View>
</TouchableOpacity>
</View>
<View style={{flexDirection: 'row'}}>
<Text style={styles.create_account_label} numberOfLines={1}>{item.create_account_label}</Text>
<TouchableOpacity  onPress={onPressCreateAccountButton}>
    <View style={styles.create_account_button}>{'Create Account Button'}</View>
</TouchableOpacity>
</View>
</ScrollView>
)}

export default Login;

const styles = StyleSheet.create({
    "center": {
        "flex": 1,
        "justifyContent": "center",
        "alignItems": "center"
    },
    "app_name": {
        "flex": 1,
        "color": "#080707",
        "fontSize": 15,
        "fontWeight": "400",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "login_title": {
        "flex": 1,
        "color": "#090707",
        "fontSize": 15,
        "fontWeight": "400",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "email_address": {
        "flex": 1,
        "fontSize": 15,
        "fontWeight": "400",
        "padding": 10,
        "margin": 5,
        "backgroundColor": "whitesmoke"
    },
    "password": {
        "flex": 1,
        "fontSize": 15,
        "fontWeight": "400",
        "padding": 10,
        "margin": 5,
        "backgroundColor": "whitesmoke"
    },
    "login_button": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white"
    },
    "or_label": {
        "flex": 1,
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "fontWeight": "400",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "facebook_login_button": {
        "flex": 1,
        "padding": "10px",
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white"
    },
    "google_login_button": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white"
    },
    "create_account_label": {
        "flex": 1,
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "fontWeight": "400",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "create_account_button": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white"
    }
});