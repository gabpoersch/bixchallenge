from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Employee, Vacation
from .serializers import EmployeeSerializer, VacationSerializer


@api_view(['GET', 'POST'])
def employee_list(request):
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
def employee_detail(request, pk):
    try:
        employee = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def employee_vacations(request, pk):
    if request.method == 'GET':
        vacations = Vacation.objects.filter(employee_id=pk)
        serializer = VacationSerializer(vacations, many=True)
        return Response(serializer.data)


# @api_view(['GET', 'POST'])
# def vacation_list(request):
#     if request.method == 'GET':
#         vacations = Vacation.objects.all()
#         serializer = VacationSerializer(vacations, many=True)
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         serializer = VacationSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# @api_view(['GET', 'PUT', 'DELETE'])
# def vacation_detail(request, pk):
#     try:
#         vacation = Vacation.objects.get(pk=pk)
#     except Vacation.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#         serializer = VacationSerializer(vacation)
#         return Response(serializer.data)
#     elif request.method == 'PUT':
#         serializer = VacationSerializer(vacation, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'DELETE':
#         vacation.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
