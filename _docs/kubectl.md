---
title: "Kubernetes (kubectl)"
description: "Inspect, apply, debug, and scale — the kubectl commands that matter."
category: "DevOps"
tags: [devops]
---
# Kubernetes (kubectl)

{% include downloads.html slug="kubectl" %}

`kubectl` talks to a cluster's API server. Almost every command takes `-n <namespace>` (or `-A` for all namespaces) — forgetting it is the number-one reason "my pod isn't there." Set a default namespace to save the typing.

## Inspect Resources

| Command | Shows |
| --- | --- |
| `kubectl get pods` | pods in the current namespace |
| `kubectl get pods -A` | pods across all namespaces |
| `kubectl get pods -o wide` | add node & IP columns |
| `kubectl get all` | pods, services, deployments, etc. |
| `kubectl describe pod <name>` | events + full detail for one object |
| `kubectl get pod <name> -o yaml` | the live manifest |

## Context & Namespace

| Command | Does |
| --- | --- |
| `kubectl config get-contexts` | list clusters you can talk to |
| `kubectl config current-context` | which cluster am I on? |
| `kubectl config use-context <name>` | switch clusters |
| `kubectl get pods -n kube-system` | target one namespace |
| `kubectl config set-context --current --namespace=dev` | set a default namespace |

> **Know your context before you act.** The same `kubectl delete` runs against whatever context is current — including prod. `kubectx` / `kubens` (or a shell prompt that shows the context) make the active target impossible to miss.

## Apply & Manage

| Command | Does |
| --- | --- |
| `kubectl apply -f app.yaml` | create or update from a manifest |
| `kubectl delete -f app.yaml` | delete what the manifest defines |
| `kubectl edit deploy <name>` | edit a live object in $EDITOR |
| `kubectl scale deploy <name> --replicas=3` | change replica count |
| `kubectl rollout restart deploy <name>` | restart pods (e.g. after a config change) |
| `kubectl rollout status deploy <name>` | watch a rollout finish |
| `kubectl rollout undo deploy <name>` | roll back to the previous version |

## Debugging

| Command | Does |
| --- | --- |
| `kubectl logs <pod>` | print a pod's logs |
| `kubectl logs -f <pod>` | follow logs live |
| `kubectl logs <pod> --previous` | logs from the crashed instance |
| `kubectl exec -it <pod> -- sh` | shell into a running pod |
| `kubectl port-forward <pod> 8080:80` | tunnel a local port to the pod |
| `kubectl get events --sort-by=.lastTimestamp` | recent cluster events |

## Nodes & Cluster

| Command | Shows / does |
| --- | --- |
| `kubectl get nodes` | cluster nodes and their status |
| `kubectl top nodes` | live CPU / memory per node (needs metrics-server) |
| `kubectl top pods` | resource use per pod |
| `kubectl cluster-info` | control-plane endpoints |
| `kubectl cordon <node>` | stop scheduling new pods onto a node |
| `kubectl drain <node>` | evict pods to prep a node for maintenance |
