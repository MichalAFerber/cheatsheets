---
title: "Kubernetes (kubectl)"
description: "Inspect, apply, debug, and scale — the kubectl commands that matter."
category: "DevOps"
tags: [devops]
---
# Kubernetes (kubectl)

<p class="dl-pills">
<a class="dl-pill" href="../downloads/kubectl.pdf" title="Download PDF"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>PDF</a>
<a class="dl-pill" href="../downloads/kubectl.md" title="Markdown source"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z"/></svg>Markdown</a>
<a class="dl-pill" href="../downloads/kubectl.html" title="Download HTML"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>HTML</a>
</p>

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
