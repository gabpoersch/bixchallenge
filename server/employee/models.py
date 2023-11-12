from django.db import models
from company.models import Company
from django.utils.translation import gettext_lazy as _


class Employee(models.Model):
    name = models.CharField(max_length=255)
    cpf = models.CharField(max_length=11, unique=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    photo = models.ImageField(_("Photo"), upload_to='employee_photos/', null=True,
                              blank=True)

    def __str__(self):
        return self.name


class Vacation(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='vacations')
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.employee.name} ({self.employee.cpf}) - {self.start_date} to {self.end_date}"
