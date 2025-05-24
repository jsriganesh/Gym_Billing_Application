import React from 'react';
import { View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';



interface DateTimePickerComponentProps {
    mode:'date' | 'time',
    updateDate:(date:Date)=> void
    date:Date
    minimumDate?:Date
    maximumDate?:Date
  }
  
  const DateTimePickerComponent = ({mode,date,updateDate,minimumDate,maximumDate}: DateTimePickerComponentProps) => {
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
    updateDate(currentDate)
    } else {
    }
  };

  return (
    <View>
        <DateTimePicker
        minimumDate={minimumDate ? minimumDate:undefined}
        maximumDate={maximumDate ? maximumDate:undefined}
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      </View>
  );
};

export default DateTimePickerComponent;
