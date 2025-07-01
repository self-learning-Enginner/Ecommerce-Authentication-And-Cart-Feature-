import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/schema/schemaType";
import { supabase } from "@/lib/supabase";
import { Toast } from "react-native-toast-notifications";
import { Link, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

const Auth = () => {
  const { control, handleSubmit, formState } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  // const onclick = () => {
  //   const a = Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  //   console.log(a);
  // };

  const signIn = async (fdata: loginSchemaType) => {
    const { error, data } = await supabase.auth.signInWithPassword(fdata);

    if (error) {
      alert(error.message);
    }
    if (!error) {
      Toast.show("Sign In SuccesFully", {
        type: "success",
        placement: "top",
        duration: 2000,
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      console.log(data.session?.user);

      router.replace("/(shop)");
      router.reload();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Please Authinticate To Continue</Text>
      <View style={{ marginTop: 40, gap: 10 }}>
        <Controller
          control={control}
          name="email"
          render={({
            field: { value, onBlur, onChange },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="Enter Your Email"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor="#1000d8"
                autoCapitalize="none"
                editable={!formState.isSubmitting}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { value, onBlur, onChange },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="Enter Your Password"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor="#1000d8"
                secureTextEntry
                autoCapitalize="none"
                editable={!formState.isSubmitting}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(signIn)}>
          <Text style={styles.buttonText}>Sign In </Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 19, fontWeight: "500" }}>
            Alreadt Have A Account Plz{" "}
            <Link
              style={{ color: "#0087ff" }}
              href="/authRegister">
              SignUp
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 16,
    width: "100%",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 25,
    color: "#6358ed",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    padding: 20,
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#6a1b9a",
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  error: {
    color: "red",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 20,
    width: "100%",
  },
});
