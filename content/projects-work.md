# Projects - Work

[Back to Projects](/?projects.md)

## At Shell

### RVSRunner

Client-server model configuration management for remote provisioning of payment systems

- Allows for on-site technicians to perform specific tasks from a point of sale terminal that would otherwise require access to the store's "site controller" server.
- Built in Python's Flask framework
- CI/CD pipeline with Github Actions workflow. Workflows run automated testing (PyTest), packaging (PyInstaller), versioning (SemVer), and a webhook to update the OCS Inventory package.
- Custom installer to manage Windows service creation, IIS configuration, socket bindings, self-signed SSL certs, static files, templates.
- Desired system state is assured during service start-up, checking if clients have self-signed SSL certs in their cert store, server host names in their Hosts file.

### RCM Azure Migration

Azure subscription migration for site management controller VMs

- Move the application that manages the stores (inventory, pricing, etc) to a different Azure subscription, performing a software upgrade in the process.
    - Scheduled VM snapshots and database backups (Ansible)
    - SQL Server data migration (Ansible, Python)
    - IIS configuration, SSL certs, socket bindings (Ansible, PowerShell)
    - Management software install, importing configuration from previous instance. (Ansible)
    - Client-side cut-over (PowerShell ran via Windows Task Scheduler)


### Automated Self-checkout Kiosk Provisioning

Self-checkout kiosks required automation to reduce costs from hiring third parties for hardware installation.

- A custom Windows image with preinstalled software and scripts that run at first boot.
- Dynamic user generation (Python script to template XML files from SQL Server data).
- Dynamic inventory and UI generation (Python script to template XML files from SQL Server data).


## At Cybera

### Miridor

Intrusion Detection System (IDS) as a Service for use by Cybera's member organizations.

- Multi-region distributed system (Calgary, Edmonton).
- Ansible roles and automated tests for configuring bare-metal servers, provisioning LXD containers, and deploying Miridor.
- Alerting and metrics collection carried out by [Sensu Go](https://sensu.io/), stored in Graphite, with visualizations in Grafana.
- Linux performance optimizations to reduce packet capture misses.
- App Components:
    - [Django](https://github.com/django/django): The web backend, set up as a [Netbox](https://github.com/netbox-community/netbox) plugin. Using a custom SSO plugin that sources the entity data from [Shibboleth](https://github.com/winstonhong/Shibboleth-SAML-IdP-and-SP).
    - [Suricata](https://github.com/OISF/suricata): monitors a mirrored network bridge interface (which comes from a distribution switch in the DC), captures live packet data and compares it against frequently updated threat lists. Any matches are logged in JSON format, which can be slurped up by Fluentd.
    - [Fluentd](https://www.fluentd.org/) parses these logs and inserts the data into Postgres. The database stores users, network events, and IDS rules in tables indexed for events by client and events by timestamp.

### Openstack Designate plugin for Netbox API

[OpenStack Designate](https://docs.openstack.org/designate/latest/intro/index.html) plugin to update Netbox entries whenever Designate DNS records are changed.

- Python 3 module packaged for apt, applied via Puppet.
    - Designate calls plugins whenever an event occurs, passing the information in JSON.
    - The plugin queries the Netbox API for a match entry, updating / inserting an entry via the API if necessary.
- Automated testing in PyTest