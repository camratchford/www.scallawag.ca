# Projects - Work

[Back](/?previousPage=1)

## At Shell

### RVSRunner

Client-server model configuration management for remote provisioning of payment systems

- Allows for on-site technicians to perform specific tasks from a point of sale terminal that would otherwise require access to the store's "site controller" server.
- Built in Python's Flask framework
- CI/CD pipeline with Github Actions workflow. Workflows run automated testing (PyTest), packaging (PyInstaller), versioning (SemVer), and a webhook to update the OCS Inventory package.
- Custom installer to manage Windows service creation, IIS configuration, socket bindings, self-signed SSL certs, static files, templates.
- Desired system state is assured during service start-up, checking if clients have self-signed SSL certs in their cert store, server host names in their Hosts file.

### RCM Azure Migration

Azure subscription migration for site management controller (RCM) 

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

Miridor was an 'Intrusion Detection System (IDS) as a Service' for use by Cybera's member organizations. While it is no 
longer in service (due to lack of client interest), you can find the blog post [here](https://www.cybera.ca/cybera-unveils-intrusion-detection-service-for-alberta-schools-and-smaller-public-institutions/).

#### Overview

- Multi-region distributed system (Calgary, Edmonton).
- Ansible roles and automated tests for configuring bareMetal servers, provisioning LXD containers, and deploying Miridor.
- Alerting and metrics collection carried out by [Sensu Go](https://sensu.io/), stored in Graphite, with visualizations in Grafana.
- Linux performance optimizations to reduce packet capture misses.
- App Components:
    - [Django](https://github.com/django/django): The web backend, set up as a [Netbox](https://github.com/netbox-community/netbox) plugin. Using a custom SSO plugin that sources the entity data from [Shibboleth](https://github.com/winstonhong/Shibboleth-SAML-IdP-and-SP).
    - [Suricata](https://github.com/OISF/suricata): monitors a mirrored network bridge interface (which comes from a distribution switch in the DC), captures live packet data and compares it against frequently updated threat lists. Any matches are logged in JSON format, which can be slurped up by Fluentd.
    - [Fluentd](https://www.fluentd.org/) parses these logs and inserts the data into Postgres. The database stores users, network events, and IDS rules in tables indexed for events by client and events by timestamp.


#### Diagram

@startuml

scale 1

!include <C4/C4_Container>
!theme C4_superhero from <C4/themes>

LAYOUT_TOP_DOWN()
LAYOUT_WITH_LEGEND()
HIDE_STEREOTYPE()
!$lineFont = "#dbdbdb"
!$arrowFontSize = 2

AddElementTag("network", $fontColor=$ELEMENT_FONT_COLOR, $bgColor="#3867ba", $borderColor="#4c8dff", $legendText="Core Switch")
AddElementTag("bareMetal", $fontColor=$ELEMENT_FONT_COLOR, $bgColor="#2fb397", $borderColor="#4b9464", $legendText="Compute Node")
AddElementTag("service", $fontColor="#efefef", $bgColor="#5b5b5b", $borderColor="#1b1b1b", $legendText="Service")

AddElementTag("lxdContainer", $fontColor="#efefef", $bgColor="#3b3b3b", $borderColor="#1b1b1b", $legendText="LXD Container")
AddElementTag("region", $fontColor="#efefef", $bgColor="#5b5b5b", $borderColor="#1b1b1b", $legendText="Region Boundary")
AddRelTag("VLANMirror", $textColor=$lineFont, $lineColor=#red, $legendText="VLAN Mirror")
AddRelTag("Trunk", $textColor=$lineFont, $lineColor=#blue, $legendText="Trunk")
AddRelTag("VLANBridge", $textColor=$lineFont, $lineColor=#green, $legendText="VLAN Bridge")
AddRelTag("IntMirror", $textColor=$lineFont, $lineColor=#orange, $legendText="Interface Mirror")
skinparam linetype ortho
skinparam ParticipantPadding 60
!$BOUNDARY_COLOR ?= "#4b4b4b"

Title "Miridor Network Diagram"

Person(user, "Miridor User")
System(backbone, "Research & Education Network", $tags="network")
Rel_D(user, backbone, "")

Boundary(yegBoundary, "Edmonton Datacenter", $tags="region")  {
  System(yegSwitch, "Distribution Switch", $tags="network")
    System(yegMiridor01, "LXD Host\nyeg-miridor-01", $tags="bareMetal")
    Rel_D(yegSwitch, yegMiridor01, "", $tags="VLANMirror")
    Rel_D(yegSwitch, yegMiridor01, "", $tags="Trunk")
      System(yegMiridor01DB, "Postgresql Container", $tags="lxdContainer")
      System(yegMiridor01Suricata, "IDS Container", $tags="lxdContainer")
      Rel_D(yegMiridor01, yegMiridor01DB, "", $tags="VLANBridge")
      Rel_D(yegMiridor01, yegMiridor01Suricata, "", $tags="VLANBridge")
      Rel_D(yegMiridor01, yegMiridor01Suricata, "", $tags="IntMirror")
    System(yegMiridor02, "LXD Host\nyeg-miridor-02", $tags="bareMetal")
    Rel_D(yegSwitch, yegMiridor02, "", $tags="VLANMirror")
    Rel_D(yegSwitch, yegMiridor02, "", $tags="Trunk")
      System(yegMiridor02DB, "Postgresql Container", $tags="lxdContainer")
      System(yegMiridor02Suricata, "IDS Container", $tags="lxdContainer")
      Rel_D(yegMiridor02, yegMiridor02DB, "", $tags="VLANBridge")
      Rel_D(yegMiridor02, yegMiridor02Suricata, "", $tags="VLANBridge")
      Rel_D(yegMiridor02, yegMiridor02Suricata, "", $tags="IntMirror")
}
Rel_L(backbone, yegSwitch, "", $tags="Trunk")
Boundary(yycBoundary, "Calgary Datacenter", $tags="region")  {
  System(yycSwitch, "Distribution Switch", $tags="network")
    System(yycMiridor01, "LXD Host\nyyc-miridor-01", $tags="bareMetal")
    Rel_D(yycSwitch, yycMiridor01, "", $tags="VLANMirror")
    Rel_D(yycSwitch, yycMiridor01, "", $tags="Trunk")
      System(yycMiridor01DB, "Postgresql Container", $tags="lxdContainer")
      System(yycMiridor01Suricata, "IDS Container", $tags="lxdContainer")
      Rel_D(yycMiridor01, yycMiridor01DB, "", $tags="VLANBridge")
      Rel_D(yycMiridor01, yycMiridor01Suricata, "", $tags="VLANBridge")
      Rel_D(yycMiridor01, yycMiridor01Suricata, "", $tags="IntMirror")
    System(yycMiridor02, "LXD Host\nyyc-miridor-02", $tags="bareMetal")
    Rel_D(yycSwitch, yycMiridor02, "", $tags="VLANMirror")
    Rel_D(yycSwitch, yycMiridor02, "", $tags="Trunk")
      System(yycMiridor02DB, "Postgresql Container", $tags="lxdContainer")
      System(yycMiridor02Suricata, "IDS Container", $tags="lxdContainer")
      Rel_D(yycMiridor02, yycMiridor02DB, "", $tags="VLANBridge")
      Rel_D(yycMiridor02, yycMiridor02Suricata, "", $tags="VLANBridge")
      Rel_D(yycMiridor02, yycMiridor02Suricata, "", $tags="IntMirror")
}
Rel_R(backbone, yycSwitch, "", $tags="Trunk")

Boundary(cybera, "Cybera Network Closet", $tags="region") {
  System(cyberaSwitch, "Distribution Switch", $tags="network")
    System(cyberaHost, "LXD Host", $tags="bareMetal")
    Rel_D(cyberaSwitch, cyberaHost, "", $tags="Trunk")
      System(cyberaPortal, "Client Portal\n(Django Server)", $tags="lxdContainer")
      System(cyberaCMDB, "CMDB\n(Netbox)", $tags="lxdContainer")
      Rel_D(cyberaHost, cyberaPortal, "", $tags="VLANBridge")
      Rel_D(cyberaHost, cyberaCMDB, "", $tags="VLANBridge")
}
Rel(backbone, cyberaSwitch, "", $tags="Trunk")

SHOW_LEGEND()

@enduml


### Openstack Designate plugin for Netbox API

[OpenStack Designate](https://docs.openstack.org/designate/latest/intro/index.html) plugin to update Netbox entries whenever Designate DNS records are changed.

- Python 3 module packaged for apt, applied via Puppet.
    - Designate calls plugins whenever an event occurs, passing the information in JSON.
    - The plugin queries the Netbox API for a match entry, updating / inserting an entry via the API if necessary.
- Automated testing in PyTest


## At CMG

### VMWare Cluster - Storage Integration

The growing need for addition virtual machines on faster hardware led to the purchase of 4 new HP servers,
a Mellanox Infiniband switch, and a Nimble storage appliance. 

When the new equipment was racked and the network was set up, I was tasked with configuring the Nimble. 
After spending 2 hours speaking with Nimble support to resolve an issue related to iSCSI over Infiniband, I began 
working on the configuration. I set a VM policy to create a new virtual storage volume for each VM, with automated 
snapshots taken every night. Quotas and alerts were set to email us when the quotas were exceeded. I set a rule to 
ensure that users were not allowed to provision extremely large disks. 

After the config was set and all tests passed, we started importing the 30 odd VMs from the old cluster. Thankfully,
we were able to perform the migration with all VMs offline, removing the need for the complicated live-transfer process.
I simply copied the VM files from one NFS share to another with rsync, then ran a PowerShell script to import the copied
VMs on the new vSphere instance.


### Printer Shopping and Print Management Software Integration

Our existing compliment of outdated Multi-function printers were dying. It was time to get new ones.


#### Printer Shopping

I was tasked with shopping around for 3 full-size multifunction printer/scanner/copier units.

- Drafted an RFP detailing the business requirements, distributing the document to various vendors.
- Worked with vendor sales teams to determine which printer met our wants and needs.
- Negotiated unit price, delivery options, and per-page service agreements. The resulting price was 30% lower 
  than what was originally quoted.
- Presented business case for purchasing new printers to executives. The presentation was effective in
  convincing them to shell out the necessary dollars.


#### Print Management Software Integration

Along with the printers, we purchased a license for the Xerox Enterprise Suite management software.

Among its many features was RFID card LDAP authentication. One of the possible methods of linking the access cards
to the user database was encoding an Active Directory user attribute with the access card's unique ID. The task set out for me
then had a few problems to solve.

- How do we get the access card IDs out of the building management system? The system was managed separately from AD, and
  provided no interface for exporting the list of ids and assigned users. 
  - This was accomplished by querying the database directly with the database in a Python script. I don't recall what kind database was , but it was not your typical 
    SQLite, MySQL, Oracle, or MS SQL Server. I was SQL though, and they did have a CLI tool to interact with it, so I was able to 
    export the IDs and usernames to a CSV.
- The ID string from the building management system was stored as an integer decimal string, while the printer management software
  only accepted a hex string. 
  - Easy, right? Except the building management software only stored the decimal value of the 2nd field
      of the [Wiegand](https://en.wikipedia.org/wiki/Wiegand_interface) format, and the conversion required some [actual math](http://www.ccdesignworks.com/wiegand_calc.html).
  - This was accomplished within the same Python script, where the necessary bit-level math was performed. 
    The output was a CSV containing the AD usernames with their corresponding RFID access card IDs. 
- The adding of AD User extended attributes was a simple PowerShell script that ingested a CSV and edited the specific User object's
  attribute that should contain the RFID card's hex-encoded ID.