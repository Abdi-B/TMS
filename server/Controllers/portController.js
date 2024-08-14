import Port from "../Models/portModel.js";

const createPort = async (req, res) => {
  let createdBy = req.auth_user._id;
  try {
    // console.log(req.body);
    const {
      portName,
      portNumber,
      portAssignment,
      portSiteAssignment,
      portCapacity,
    } = req.body;

    const existing_port = await Port.findOne({ portNumber });

    if (existing_port) {
      return res.status(400).json({ message: "Port Number already exist" });
    }
    const existing_port_name = await Port.findOne({ portName });

    if (existing_port_name) {
      return res.status(400).json({ message: "Port Name already exist" });
    }
    const new_port = await Port.create({
      portName,
      portNumber,
      portAssignment,
      portSiteAssignment,
      portCapacity,
      createdBy,
    });

    console.log(new_port);
    res.status(200).json({
      status: "success",
      new_port,
      message: "Port is successfully created.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the port.",
    });
  }
};

const getPorts = async (req, res) => {
  const ports = await Port.find();

  // console.log(user);

  res.status(200).json({
    status: "true",
    ports,
  });
};

// const getAssignedPorts = async (req, res) => {
//   try {
//     const { portSiteAssignment, portAssignment } = req.query;
//     console.log("Query Params:", portSiteAssignment, portAssignment); // Log query params

//     // Fetch ports with their capacities and used port counts
//     const ports = await Port.find({
//       portSiteAssignment,
//       portAssignment,
//       isDeleted: false,
//     }).select("portNumber portCapacity usedPorts");

//     console.log("Fetched Ports:", ports); // Log fetched ports

//     // Filter ports where usedPortsCount is less than portCapacity
//     const availablePorts = ports
//       .filter((port) => {
//         console.log(
//           `Port: ${port.portNumber}, Capacity: ${port.portCapacity}, Used: ${port.usedPorts}`
//         );
//         return port.usedPorts < port.portCapacity;
//       })
//       .map((port) => port.portNumber);

//     console.log("Available Ports:", availablePorts); // Log available ports

//     // Respond with the available port numbers as JSON
//     res.status(200).json({ availablePorts });
//   } catch (error) {
//     console.error("Error fetching assigned ports:", error);
//     res.status(500).json({ error: "Failed to fetch assigned ports" });
//   }
// };

const getAssignedPorts = async (req, res) => {
  try {
    const { portSiteAssignment, portAssignment } = req.query;
    console.log("Query Params:", portSiteAssignment, portAssignment); // Log query params

    // Fetch ports based on the specified type and site
    const specificPorts = await Port.find({
      portAssignment: portAssignment,
      portSiteAssignment: portSiteAssignment,
      isDeleted: false,
    }).select("portNumber portCapacity usedPorts");

    console.log("Specific Ports:", specificPorts); // Log specific ports

    // Fetch ports assigned to BothType with the specified site
    const bothTypePorts = await Port.find({
      portAssignment: "BothType",
      portSiteAssignment: portSiteAssignment,
      isDeleted: false,
    }).select("portNumber portCapacity usedPorts");

    console.log("BothType Ports:", bothTypePorts); // Log BothType ports

    // Fetch ports assigned to BothSite with the specified type
    const bothSitePorts = await Port.find({
      portAssignment: portAssignment,
      portSiteAssignment: "BothSite",
      isDeleted: false,
    }).select("portNumber portCapacity usedPorts");

    console.log("BothSite Ports:", bothSitePorts); // Log BothSite ports

    // Fetch ports assigned to BothType and BothSite (no specific filter)
    const bothTypeAndSitePorts = await Port.find({
      portAssignment: "BothType",
      portSiteAssignment: "BothSite",
      isDeleted: false,
    }).select("portNumber portCapacity usedPorts");

    console.log("BothType and BothSite Ports:", bothTypeAndSitePorts); // Log BothType and BothSite ports

    // Combine all fetched ports
    const allPorts = [
      ...specificPorts,
      ...bothTypePorts,
      ...bothSitePorts,
      ...bothTypeAndSitePorts,
    ];

    console.log("All Ports Before Deduplication:", allPorts); // Log all ports before deduplication

    // Remove duplicates based on portNumber
    const uniquePortsMap = new Map();
    allPorts.forEach((port) => {
      if (!uniquePortsMap.has(port.portNumber)) {
        uniquePortsMap.set(port.portNumber, port);
      }
    });

    const uniquePorts = Array.from(uniquePortsMap.values());

    console.log("Unique Ports:", uniquePorts); // Log unique ports

    // Filter ports where usedPortsCount is less than portCapacity
    const availablePorts = uniquePorts
      .filter((port) => {
        console.log(
          `Port: ${port.portNumber}, Capacity: ${port.portCapacity}, Used: ${port.usedPorts}`
        );
        return port.usedPorts < port.portCapacity;
      })
      .map((port) => port.portNumber);

    console.log("Available Ports:", availablePorts); // Log available ports

    // Respond with the available port numbers as JSON
    res.status(200).json({ availablePorts });
  } catch (error) {
    console.error("Error fetching assigned ports:", error);
    res.status(500).json({ error: "Failed to fetch assigned ports" });
  }
};

const deletePort = async (req, res) => {
  try {
    // Extract port ID from request parameters
    const portId = req.params.id;

    // Validate port ID
    if (!portId) {
      return res.status(400).json({ message: "Port ID is required" });
    }

    // Fetch the port from the database
    const port = await Port.findById(portId);
    if (!port) {
      return res.status(404).json({ message: "Port not found" });
    }

    // Check if usedPorts is 0
    if (port.usedPorts !== 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete port. The port is in use." });
    }

    // Perform a soft delete by updating the document
    await Port.findByIdAndDelete(portId);
    res.status(200).json({ message: "Port deleted successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error deleting Port:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export { createPort, getPorts, getAssignedPorts, deletePort };
