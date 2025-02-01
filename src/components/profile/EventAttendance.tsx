import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Avatar, Button } from 'react-native-paper';
import { useTagOfEventQuery } from '../../hooks/query/user-query';
import { useToast } from 'react-native-toast-notifications';
import { useMarkEventAttendanceMutation } from '../../hooks/mutation/user-action-mutation';

interface IEventAttendanceProps {
  email: string;
  event: string;
  close: any;
}

export const EventAttendance = (props: IEventAttendanceProps) => {
  const { data: qrCode, isLoading } = useTagOfEventQuery(
    props.email,
    props.event,
  );

  const toast = useToast();
  const { mutateAsync } = useMarkEventAttendanceMutation();

  const handleClick = async () => {
    mutateAsync({ email: props.email, event: props.event }).then(res => {
      if (res.success) {
        toast.show('Updated', { type: 'success' });
        props.close();
      } else {
        toast.show('Failed. Try after sometime', { type: 'danger' });
        props.close();
      }
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} color="#4E8FB4" size="large" />
      ) : (
        <>
          {qrCode?.success && qrCode?.data.tag !== 'not going' ? (
            <>
              <Avatar.Icon
                size={100}
                icon="check"
                style={{ backgroundColor: 'green' }}
              />
              <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Allowed</Text>
            </>
          ) : (
            <>
              <Avatar.Icon
                size={100}
                icon="close"
                style={{ backgroundColor: 'red' }}
              />
              <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
                Allowed Denied
              </Text>
            </>
          )}

          <Text style={{ color: '#FFFFFF', fontSize: 20 }}>{props.email}</Text>
          {qrCode?.success && (
            <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
              Tag: {qrCode?.data.tag}
            </Text>
          )}

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Button mode="contained" onPress={props.close}>
              Cancel
            </Button>

            {qrCode?.success && (
              <Button mode="contained" onPress={handleClick}>
                Allow
              </Button>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
});
