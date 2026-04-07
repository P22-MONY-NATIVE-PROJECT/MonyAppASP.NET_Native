import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  useColorScheme,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/theme';
import { profileStyles as s } from '@/styles/profileStyles';
import { editProfileSchema, EditProfileFormData } from '@/schemas/authSchema';
import { useEditProfileMutation } from '@/services/authService';
import { setAuth } from '@/store/authSlice';
import { APP_URLS } from '@/constants/Urls';
import { AppLoader } from '@/components/ui/app-loader';

export default function EditProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors.light;

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  const [localImageUri, setLocalImageUri] = useState<string | null>(null);

  const [editProfile, { isLoading }] = useEditProfileMutation();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: user?.name?.split(' ')[0] ?? '',
      lastName: user?.name?.split(' ').slice(1).join(' ') ?? '',
      email: user?.email ?? '',
      imageFile: undefined,
    },
  });

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow access to your photo library.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      const file = { uri: asset.uri, name: asset.fileName ?? 'profile.jpg', type: asset.mimeType ?? 'image/jpeg' };
      setLocalImageUri(asset.uri);
      setValue('imageFile', file);
    }
  };

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      const response = await editProfile(data).unwrap();
      dispatch(setAuth({ accessToken: response.accessToken }));
      router.back();
    } catch (error: any) {
      Alert.alert('Update failed', error?.data?.message || 'Something went wrong');
    }
  };


  // Show local pick > existing server image > nothing
  const avatarUri = localImageUri ?? (user?.image ? APP_URLS.IMAGES_400_URL + user.image : null);
  const initials = ((user?.name?.split(' ')[0]?.[0] ?? '') + (user?.name?.split(' ')[1]?.[0] ?? '')).toUpperCase();

  if (!user) return null;

  return (
    <>
      <AppLoader visible={isLoading} message="Saving..." />
      <View style={[s.root, { backgroundColor: theme.background }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* ── Header ── */}
          <View style={s.header}>
            <View style={s.headerNav}>
              <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={[s.navButton, { backgroundColor: theme.accentSoft }]}>
                <Text style={[s.backArrow, { color: theme.accent }]}>←</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit(onSubmit)} activeOpacity={0.8} style={[s.navButton, { backgroundColor: theme.accent }]} disabled={isLoading}>
                {isLoading
                  ? <ActivityIndicator size="small" color="#fff" />
                  : <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>✓</Text>
                }
              </TouchableOpacity>
            </View>
            <Text style={[s.headerTitle, { color: theme.textSecondary }]}>EDIT PROFILE</Text>
            <View style={[s.headerRule, { backgroundColor: theme.accent }]} />
          </View>

          {/* ── Avatar picker ── */}
          <View style={s.heroSection}>
            <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={{ marginBottom: 20 }}>
              <View style={[s.avatarWrapper, { borderColor: theme.avatarRing }]}>
                <View style={[s.avatarRingInner, { borderColor: theme.accentSoft }]}>
                  {avatarUri ? (
                    <Image source={{ uri: avatarUri }} style={s.avatarImage} />
                  ) : (
                    <View style={[s.avatarFallback, { backgroundColor: theme.accentSoft }]}>
                      <Text style={[s.avatarInitials, { color: theme.accent }]}>{initials}</Text>
                    </View>
                  )}
                </View>
              </View>
              {/* Camera badge */}
              <View style={[s.cameraBadge, { backgroundColor: theme.accent }]}>
                <Text style={{ color: '#fff', fontSize: 12 }}>✎</Text>
              </View>
            </TouchableOpacity>
            <Text style={[s.userEmail, { color: theme.textSecondary }]}>Tap to change photo</Text>
          </View>

          {/* ── Form card ── */}
          <View style={[s.card, { backgroundColor: theme.surface, borderColor: theme.border, shadowColor: theme.shadow }]}>
            <Text style={[s.cardLabel, { color: theme.textSecondary }]}>ACCOUNT DETAILS</Text>

            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, value } }) => (
                <View style={[s.fieldRow, { borderBottomWidth: 1, borderBottomColor: theme.divider }]}>
                  <Text style={[s.fieldLabel, { color: theme.textSecondary }]}>First name</Text>
                  <TextInput value={value} onChangeText={onChange} placeholder="John" placeholderTextColor={theme.textSecondary} style={[s.fieldInput, { color: theme.text }]} />
                  {errors.firstName && <Text style={[s.fieldError, { color: theme.logoutText }]}>{errors.firstName.message}</Text>}
                </View>
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, value } }) => (
                <View style={[s.fieldRow, { borderBottomWidth: 1, borderBottomColor: theme.divider }]}>
                  <Text style={[s.fieldLabel, { color: theme.textSecondary }]}>Last name</Text>
                  <TextInput value={value} onChangeText={onChange} placeholder="Doe" placeholderTextColor={theme.textSecondary} style={[s.fieldInput, { color: theme.text }]} />
                  {errors.lastName && <Text style={[s.fieldError, { color: theme.logoutText }]}>{errors.lastName.message}</Text>}
                </View>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View style={s.fieldRow}>
                  <Text style={[s.fieldLabel, { color: theme.textSecondary }]}>Email</Text>
                  <TextInput value={value} onChangeText={onChange} placeholder="you@example.com" placeholderTextColor={theme.textSecondary} keyboardType="email-address" autoCapitalize="none" style={[s.fieldInput, { color: theme.text }]} />
                  {errors.email && <Text style={[s.fieldError, { color: theme.logoutText }]}>{errors.email.message}</Text>}
                </View>
              )}
            />
          </View>

          {/* ── Save button ── */}
          <TouchableOpacity
            style={[s.logoutButton, { backgroundColor: theme.accentSoft, borderColor: theme.accent }]}
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <View style={[s.logoutIcon, { backgroundColor: theme.accent }]}>
              <Text style={{ color: '#fff', fontSize: 14 }}>✓</Text>
            </View>
            <Text style={[s.logoutText, { color: theme.accent }]}>Save changes</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </>
  );
}
