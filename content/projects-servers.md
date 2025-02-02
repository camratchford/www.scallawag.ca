# Projects - Servers & More

[Back](/?previousPage)


@startuml
scale 3

!include ./cam/sprites.puml
!include <C4/C4_Container>
!theme C4_superhero from <C4/themes>

LAYOUT_TOP_DOWN()
LAYOUT_WITH_LEGEND()

!$lineFont = "#dbdbdb"
!$arrowFontSize = 2

AddElementTag("network", $fontColor=$ELEMENT_FONT_COLOR, $bgColor="#3867ba", $borderColor="#4c8dff", $legendText="Network Appliance")
AddElementTag("c-server", $fontColor=$ELEMENT_FONT_COLOR, $bgColor="#2fb397", $borderColor="#4b9464", $legendText="Compute Node")
AddElementTag("s-server", $fontColor=$ELEMENT_FONT_COLOR, $bgColor="#efb397", $borderColor="#967865", $legendText="Storage Node")
AddElementTag("service", $fontColor=#efefef, $bgColor="#5b5b5b", $borderColor="#1b1b1b", $legendText="Service", $align="center")
AddElementTag("lxd-container", $fontColor=#efefef, $bgColor="#3b3b3b", $borderColor="#1b1b1b", $legendText="LXD Container")
AddRelTag("1g", $textColor=$lineFont, $lineColor=#red)
AddRelTag("10g", $textColor=$lineFont, $lineColor=#green)
AddRelTag("vSwitch", $textColor=$lineFont, $lineColor="#62c828")
!$BOUNDARY_COLOR ?= "#4b4b4b"

' Network
System(modem, "Telus Fiber", $tags="network")

System(rt01, "Mikrotik Router\nrt01", $tags="network")
Rel_Back(modem, rt01, "Uplink", $tags="1g")

System(sw01, "Aruba Switch\nsw01", $tags="network")
Rel(rt01, sw01, "All VLANs", $tags="10g")

System(c01, "Dell Precision T5600\nc01",  $tags="c-server")
Rel(sw01, c01, "VLANs 10-13", $tags="10g")

System(c02, "Dell Precision T5600\nc02",  $tags="c-server") 
Boundary(lxd, "LXD", $tags="service") {
    Container(netSvc, "net-svc", $tags="lxd-container")
    Container(autoSvc, "auto-svc", $tags="lxd-container")
    Container(cmdbSvc, "cmdb-svc", $tags="lxd-container")
    Container(nginxProxy, "nginx-proxy", $tags="lxd-container")
    Container(nginxApp, "nginx-app", $tags="lxd-container")
    Container(staging, "staging", $tags="lxd-container")
    Container(logSvc, "log-svc", $tags="lxd-container")
    Container(githubActions, "github-actions", $tags="lxd-container")
    Container(plantuml, "plantuml", $tags="lxd-container")
}
Rel(sw01, c02, "VLANs 10-13", $tags="10g")
Rel(c01, lxd, "")
Rel(c02, lxd, "")


System(s01, "Dell Precision T7610\ns01",  $tags="s-server", <$storage>) 
Rel(sw01, s01, "VLANs 10-13", $tags="10g")
Rel(s01, lxd, "")

SHOW_LEGEND()
@enduml
