from rest_framework import serializers

class ChangePassworedSerializer(serializers.Serializer):
    old_password = serializers.CharField(required = True)
    new_password = serializers.CharField(required = True)

class RestPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required = True)