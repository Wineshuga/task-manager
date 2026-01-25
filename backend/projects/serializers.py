from rest_framework import serializers
from .models import Project, Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "title", "completed", "due_date"]

    def create(self, validated_data):
        project = self.context["project"]
        return Task.objects.create(
            project=project,
            **validated_data
        )

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "title", "description", "created_at"]

    def create(self, validated_data):
        return Project.objects.create(
            owner=self.context["request"].user,
            **validated_data
        )
