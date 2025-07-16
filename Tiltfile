# Apply
k8s_yaml('manifests/app.yaml')

# Build
docker_build('maxproske/cvepets-next', 'next', dockerfile='next/debug.Dockerfile',
    live_update=[
        # Sync
        sync('next', '/app'),
    ]
)
docker_build('maxproske/cvepets-openvas', 'openvas', dockerfile='openvas/Dockerfile')

# Expose
k8s_resource('next-deployment', port_forwards=[443, 80])
k8s_resource('openvas-deployment', port_forwards=8080)
