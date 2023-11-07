from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=140)
    cnpj = models.CharField(max_length=14, unique=True)

    def __str__(self):
        return self.name
