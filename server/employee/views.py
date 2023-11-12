from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from .models import Employee, Vacation
from .serializers import EmployeeSerializer, VacationSerializer, EmployeeTimelineSerializer


@api_view(['GET', 'POST'])
@parser_classes((MultiPartParser, FormParser, JSONParser))
def list_or_create_employees(request):
    if request.method == 'GET':
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@parser_classes((MultiPartParser, FormParser, JSONParser))
def get_update_or_delete_employee(request, pk):
    try:
        employee = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = EmployeeSerializer(employee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def list_or_create_vacations(request):
    if request.method == 'GET':
        vacations = Vacation.objects.all()
        serializer = VacationSerializer(vacations, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = VacationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def get_update_or_delete_vacation_by_id(request, pk):
    try:
        vacation = Vacation.objects.get(pk=pk)
    except Vacation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = VacationSerializer(vacation)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = VacationSerializer(vacation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        vacation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_employee_vacations(request, pk):
    if request.method == 'GET':
        vacations = Vacation.objects.filter(employee_id=pk)
        serializer = VacationSerializer(vacations, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def list_timeline(request):
    employees = Employee.objects.all().prefetch_related('vacations')
    serializer = EmployeeTimelineSerializer(employees, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_employee_timeline(request, employee_id):
    try:
        employee = Employee.objects.prefetch_related('vacations').get(pk=employee_id)
    except Employee.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = EmployeeTimelineSerializer(employee)
    return Response(serializer.data)
