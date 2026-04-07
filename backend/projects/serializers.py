from rest_framework import serializers
from .models import Project, Task
from telemetry import project_counter

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'status', 'due_date', 'created_at']
        read_only_fields = ['id', 'created_at']
        
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "title", "description", "created_at"]

    def create(self, validated_data):
        project = Project.objects.create(
            owner=self.context["request"].user,
            **validated_data
        )
        project_counter.add(1)
        return project
