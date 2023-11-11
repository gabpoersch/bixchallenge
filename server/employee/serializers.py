from rest_framework import serializers
from .models import Employee, Vacation


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class VacationSerializer(serializers.ModelSerializer):
    vacation_start_date = serializers.DateField(source='start_date')
    vacation_end_date = serializers.DateField(source='end_date')

    class Meta:
        model = Vacation
        fields = ('id', 'vacation_start_date', 'vacation_end_date', 'employee')

    def validate(self, data):
        employee = data['employee']

        if data['start_date'] < employee.start_date:
            raise serializers.ValidationError("Vacation start date must be after the employee's start date.")

        if employee.end_date and data['end_date'] > employee.end_date:
            raise serializers.ValidationError("Vacation end date must be before the employee's end date.")

        return data


class EmployeeTimelineSerializer(serializers.ModelSerializer):
    vacations = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ('id', 'name', 'start_date', 'vacations', 'end_date')  # 'end_date' fora do 'vacations'

    def get_vacations(self, obj):
        ordered_vacations = obj.vacations.all().order_by('start_date')
        return VacationSerializer(ordered_vacations, many=True).data
