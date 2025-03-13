import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '@/api/auth';
import { router } from 'expo-router';

interface RegisterProps {
  togglePage: (toPage: string) => void;
}

export default function RegisterScreen({ togglePage }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { registerUser } = useAuth();
  const theme = useColorScheme();

  const handleRegister = async () => {
    if (!email.trim()) {
      Alert.alert('이메일 오류', '이메일을 입력해주세요');
      return;
    }
    if (!password.trim()) {
      Alert.alert('비밀번호 오류', '비밀번호를 입력해주세요');
      return;
    }
    if (!passwordConfirm.trim()) {
      Alert.alert('비밀번호 오류', '비밀번호 확인을 입력해주세요');
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('회원가입 실패', '비밀번호가 일치하지 않습니다');
      return;
    }
    if (password.length < 8) {
      Alert.alert('비밀번호 오류', '비밀번호는 8자리 이상이어야 합니다');
      return;
    }

    try {
      await registerUser(email.trim(), password);
      Alert.alert('회원가입 성공!', '환영합니다!');
      router.replace('/');
    } catch (error: any) {
      if (error.response?.status === 409) {
        Alert.alert('회원가입 실패', '이미 존재하는 이메일입니다');
      } else {
        console.error(error);
        Alert.alert('회원가입 실패', 'Internal Error');
      }
    }
  };

  return (
    <View
      style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}
    >
      <Text style={theme === 'dark' ? styles.darkTitle : styles.lightTitle}>
        NookApp
      </Text>
      <Text
        style={theme === 'dark' ? styles.darkSubTitle : styles.lightSubTitle}
      >
        회원가입
      </Text>

      <TextInput
        style={theme === 'dark' ? styles.darkInput : styles.lightInput}
        placeholder='군산대학교 이메일을 입력해주세요'
        value={email}
        onChangeText={(text) => setEmail(text.slice(0, 40))}
        autoCapitalize='none'
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <TouchableOpacity
          style={
            theme === 'dark'
              ? styles.darkConfirmButton
              : styles.lightConfirmButton
          }
          onPress={() => {}}
        >
          <Text
            style={
              theme === 'dark'
                ? styles.darkButtonText1
                : styles.lightButtonText1
            }
          >
            이메일 확인
          </Text>
        </TouchableOpacity>
        <Text style={
          {
            backgroundColor: '#f1f5f9',
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 10,
            width: '65%',
          }
        }>인증 완료 여부 칸</Text>
      </View>

      <TextInput
        style={theme === 'dark' ? styles.darkInput : styles.lightInput}
        placeholder='비밀번호'
        value={password}
        onChangeText={(text) => setPassword(text.slice(0, 40))}
        secureTextEntry
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
      />
      <TextInput
        style={theme === 'dark' ? styles.darkInput : styles.lightInput}
        placeholder='비밀번호 확인'
        value={passwordConfirm}
        onChangeText={(text) => setPasswordConfirm(text.slice(0, 40))}
        secureTextEntry
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
      />

      {/* ✅ 회원가입 버튼 */}
      <TouchableOpacity
        style={theme === 'dark' ? styles.darkButton : styles.lightButton}
        onPress={handleRegister}
      >
        <Text
          style={
            theme === 'dark' ? styles.darkButtonText1 : styles.lightButtonText1
          }
        >
          회원가입
        </Text>
      </TouchableOpacity>

      {/* ✅ 로그인으로 이동 버튼 */}
      <TouchableOpacity
        style={
          theme === 'dark'
            ? styles.darkButtonOutline
            : styles.lightButtonOutline
        }
        onPress={() => {
          togglePage('login');
        }}
      >
        <Text
          style={
            theme === 'dark' ? styles.darkButtonText2 : styles.lightButtonText2
          }
        >
          로그인하러 가기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  lightTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 15,
  },
  darkTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 15,
  },
  lightSubTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 15,
  },
  darkSubTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 15,
  },
  lightInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000',
  },
  darkInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#eee',
  },
  lightButton: {
    backgroundColor: '#647486',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  darkButton: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  lightConfirmButton: {
    backgroundColor: '#647486',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    width: '30%',
  },
  darkConfirmButton: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    width: '30%',
  },
  lightButtonOutline: {
    borderColor: '#262d34',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  darkButtonOutline: {
    borderColor: '#bbb',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  darkButtonText1: {
    color: '#2e1111',
    fontSize: 16,
    fontWeight: 'bold',
  },
  darkButtonText2: {
    color: '#eee',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightButtonText1: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightButtonText2: {
    color: '#313143',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
